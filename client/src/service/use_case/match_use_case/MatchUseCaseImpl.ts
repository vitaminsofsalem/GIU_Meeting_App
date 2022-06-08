import { MeetRequest } from "../../../model/MeetRequest";
import { User } from "../../../model/User";
import { Match } from "../../../model/Match";
import { MatchUseCase } from "./MatchUseCase";
import { ServiceFactory } from "../../ServiceFactory";

export class MatchUseCaseImpl implements MatchUseCase {
  private auth = ServiceFactory.getFirebaseAuth();
  private db = ServiceFactory.getFirebaseDatabase();

  async matchAndCreateRequest(
    meetLocation: string,
    endTimeMillis: number,
    activity: string
  ) {
    const currentUser = await this.getCurrentUser();

    const newRequest: MeetRequest = {
      activity,
      endTime: endTimeMillis,
      id: "",
      meetLocation,
      requestCreator: currentUser,
    };
    const newReqId = await this.db.addRequest(newRequest);
    await this.db.updateUserActiveRequest(currentUser.id, newReqId);

    this.createMatchIfFoundMatchingRequest(
      currentUser,
      meetLocation,
      endTimeMillis,
      activity,
      newReqId
    );
  }

  private async createMatchIfFoundMatchingRequest(
    currentUser: User,
    meetLocation: string,
    endTimeMillis: number,
    activity: string,
    newRequestId: string
  ) {
    const currentRequests = await this.db.getRequests();
    for (const request of currentRequests) {
      if (
        this.isMatch(
          request,
          meetLocation,
          endTimeMillis,
          activity,
          currentUser
        )
      ) {
        await this.db.addMatch({
          id: "",
          user1: currentUser,
          user2: request.requestCreator,
          user1Status: "pending",
          user2Status: "pending",
          forRequests: [request.id, newRequestId],
        });
      }
    }
  }

  private isMatch(
    request: MeetRequest,
    meetLocation: string,
    endTimeMillis: number,
    activity: string,
    currentUser: User
  ) {
    const isUserMatch = this.checkUsersMatching(
      currentUser,
      request.requestCreator
    );
    const notExpired = this.isTimingNotExpired(endTimeMillis, request.endTime);
    return (
      request.activity === activity &&
      request.meetLocation === meetLocation &&
      isUserMatch &&
      notExpired
    );
  }

  private checkUsersMatching(user1: User, user2: User): boolean {
    let similarIntrests = 0;
    for (const intrest of user1.intrests) {
      if (user2.intrests.includes(intrest)) {
        similarIntrests++;
      }
    }
    return similarIntrests >= 2;
  }

  private isTimingNotExpired(
    endTimeMillis1: number,
    endTimeMillis2: number
  ): boolean {
    const now = Date.now();
    return endTimeMillis1 > now && endTimeMillis2 > now;
  }

  async subscribeToMatch(
    onMatchChange: (match?: Match) => void
  ): Promise<() => void> {
    const currentUser = await this.getCurrentUser();
    const unsubscribe = this.db.subscribeToMatches(
      currentUser.id,
      async (matches) => {
        for (const match of matches) {
          if (this.isAcceptedByBothUsers(match)) {
            if (matches.length > 1) {
              //Found final match, remove others
              await this.db.deleteMatchesOfUser(currentUser.id);
              await this.db.addMatch(match); //Re-add since it was deleted with others
            }

            onMatchChange(match);
            return;
          }
        }
        for (const match of matches) {
          if (this.isPendingUserAction(currentUser.id, match)) {
            onMatchChange(match);
            return;
          }
        }
        //No matches to show user
        onMatchChange(undefined);
      }
    );
    return unsubscribe;
  }

  private isAcceptedByBothUsers(match: Match): boolean {
    return match.user1Status === "accepted" && match.user2Status === "accepted";
  }

  private isPendingUserAction(currentUserId: string, match: Match) {
    return (
      (match.user1.id === currentUserId && match.user1Status === "pending") ||
      (match.user2.id === currentUserId && match.user2Status === "pending")
    );
  }

  async acceptMatch(matchId: string) {
    const currentUser = await this.getCurrentUser();
    await this.db.acceptMatch(currentUser.id, matchId);
  }

  async rejectMatch(matchId: string) {
    await this.db.deleteMatch(matchId);
  }

  async finishMeeting(matchId: string) {
    const currentUser = await this.getCurrentUser();

    if (currentUser.currentRequest) {
      const match = await this.db.getMatch(matchId);
      const request = await this.db.getRequest(currentUser.currentRequest);

      await this.db.addToMeetupHistory(currentUser.id, request, match);
      for (const reqId of match.forRequests) {
        await this.db.deleteRequest(reqId);
      }
      this.cancelRequest();
    }
  }

  async cancelRequest() {
    const currentUser = await this.getCurrentUser();
    if (currentUser.currentRequest) {
      await this.db.deletMatchesForRequest(currentUser.currentRequest);
      await this.db.deleteRequest(currentUser.currentRequest);
      await this.db.deleteMatchesOfUser(currentUser.id);
      await this.db.updateUserActiveRequest(currentUser.id, undefined);
    }
  }

  private async getCurrentUser(): Promise<User> {
    const user = this.auth.getCurrentUser();
    if (!user) {
      throw Error("Can't get user when not logged in");
    }
    return await this.db.getUser(user.uid);
  }
}
