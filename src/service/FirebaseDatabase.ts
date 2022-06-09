import firestore from "@react-native-firebase/firestore";
import { Match } from "../model/Match";
import { MeetRequest } from "../model/MeetRequest";
import { User } from "../model/User";

export class FirebaseDatabase {
  static instance?: FirebaseDatabase;

  private usersCollection = "users";
  private requestsCollection = "requests";
  private matchesCollection = "matches";

  async addUser(user: User) {
    const id = user.id;
    delete user.id; //No need to have field for it, will be document id
    await firestore()
      .collection(this.usersCollection)
      .doc(id)
      .set({ ...user });
  }

  async updateUserPhoto(id: string, photoUrl: string) {
    await firestore()
      .collection(this.usersCollection)
      .doc(id)
      .update({ photoUrl });
  }

  async updateUserIntrests(id: string, intrests: string[]) {
    await firestore()
      .collection(this.usersCollection)
      .doc(id)
      .update({ intrests });
  }

  async updateUserActiveRequest(id: string, activeRequestId?: string) {
    await firestore()
      .collection(this.usersCollection)
      .doc(id)
      .update({
        currentRequest: activeRequestId || firestore.FieldValue.delete(),
      });
  }

  async getUser(id: string): Promise<User> {
    const result = await firestore()
      .collection(this.usersCollection)
      .doc(id)
      .get();
    if (!result.data || !result.exists) {
      throw Error("Failed to get user");
    }
    return result.data as unknown as User;
  }

  async getRequest(id: string): Promise<MeetRequest> {
    const result = await firestore()
      .collection(this.requestsCollection)
      .doc(id)
      .get();
    if (!result.data || !result.exists) {
      throw Error("Failed to get user");
    }
    return result.data as unknown as MeetRequest;
  }

  async getMatch(id: string): Promise<Match> {
    const result = await firestore()
      .collection(this.matchesCollection)
      .doc(id)
      .get();
    if (!result.data || !result.exists) {
      throw Error("Failed to get user");
    }
    return result.data as unknown as Match;
  }

  async addToMeetupHistory(id: string, meetup: MeetRequest, match: Match) {
    await firestore()
      .collection(this.usersCollection)
      .doc(id)
      .update({
        meetUpHistory: firestore.FieldValue.arrayUnion({ meetup, match }),
      });
  }

  async addRequest(request: MeetRequest): Promise<string> {
    const result = await firestore()
      .collection(this.requestsCollection)
      .add({
        ...request,
        id: undefined,
      });
    return result.id;
  }

  async deleteRequest(id: string) {
    await firestore().collection(this.requestsCollection).doc(id).delete();
  }

  async getRequests(): Promise<MeetRequest[]> {
    const result = await firestore().collection(this.requestsCollection).get();
    return result.docs.map(
      (item) => ({ ...item.data, id: item.id } as MeetRequest)
    );
  }

  async addMatch(match: Match): Promise<string> {
    const result = await firestore()
      .collection(this.matchesCollection)
      .add({
        ...match,
        id: undefined,
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
    return result.id;
  }

  async acceptMatch(userId: string, matchId: string) {
    const result = await firestore()
      .collection(this.matchesCollection)
      .doc(matchId)
      .get();
    if (!result.data) {
      throw Error("No match with given id");
    }
    const match = result.data as unknown as Match;
    if (match.user1.id === userId) {
      await firestore()
        .collection(this.matchesCollection)
        .doc(matchId)
        .update({ user1Status: "accepted" });
    } else {
      await firestore()
        .collection(this.matchesCollection)
        .doc(matchId)
        .update({ user2Status: "accepted" });
    }
  }

  async deleteMatch(id: string) {
    await firestore().collection(this.matchesCollection).doc(id).delete();
  }

  async deleteMatchesOfUser(id: string) {
    let userMatches = await firestore()
      .collection(this.matchesCollection)
      .where("user1.id", "==", id)
      .get();
    for (const request of userMatches.docs) {
      await request.ref.delete();
    }

    userMatches = await firestore()
      .collection(this.matchesCollection)
      .where("user2.id", "==", id)
      .get();
    for (const request of userMatches.docs) {
      await request.ref.delete();
    }
  }

  async deletMatchesForRequest(requestId: string) {
    const requestMatches = await firestore()
      .collection(this.matchesCollection)
      .where("forRequest", "==", requestId)
      .get();
    for (const match of requestMatches.docs) {
      await match.ref.delete();
    }
  }

  subscribeToMatches(
    userId: string,
    onMatchesResult: (matches: Match[]) => void
  ): () => void {
    const unsubscribe = firestore()
      .collection(this.matchesCollection)
      .orderBy("timestamp")
      .onSnapshot((result) => {
        if (result.docs) {
          const mapped = result.docs.map(
            (item) => ({ ...item.data, id: item.id } as Match)
          );
          const filtered = mapped.filter(
            (item) => item.user1.id === userId || item.user2.id === userId
          );
          onMatchesResult(filtered);
        }
      });
    return unsubscribe;
  }

  async addFCMToken(id: string, token: string) {
    await firestore()
      .collection(this.usersCollection)
      .doc(id)
      .update({ fcmTokens: firestore.FieldValue.arrayUnion(token) });
  }

  async deletFCMToken(id: string, token: string) {
    await firestore()
      .collection(this.usersCollection)
      .doc(id)
      .update({ fcmTokens: firestore.FieldValue.arrayRemove(token) });
  }
}
