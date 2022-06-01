import firestore from "@react-native-firebase/firestore";
import { Match } from "../model/Match";
import { MeetRequest } from "../model/MeetRequest";
import { User } from "../model/User";

export class FirebaseDatabase {
  static instance?: FirebaseDatabase;

  static getInstance(): FirebaseDatabase {
    if (!this.instance) {
      this.instance = new FirebaseDatabase();
    }
    return this.instance;
  }

  private db = firestore();
  private usersCollection = this.db.collection("users");
  private requestsCollection = this.db.collection("requests");
  private matchesCollection = this.db.collection("matches");

  async addUser(user: User) {
    await this.usersCollection.doc(user.id).set({ ...user, id: undefined });
  }

  async updateUserPhoto(id: string, photoUrl: string) {
    await this.usersCollection.doc(id).update({ photoUrl });
  }

  async updateUserIntrests(id: string, intrests: string[]) {
    await this.usersCollection.doc(id).update({ intrests });
  }

  async updateUserActiveRequest(id: string, activeRequestId?: string) {
    await this.usersCollection.doc(id).update({
      currentRequest: activeRequestId || firestore.FieldValue.delete(),
    });
  }

  async getUser(id: string): Promise<User> {
    const result = await this.usersCollection.doc(id).get();
    if (!result.data || !result.exists) {
      throw Error("Failed to get user");
    }
    return result.data as unknown as User;
  }

  async getRequest(id: string): Promise<MeetRequest> {
    const result = await this.requestsCollection.doc(id).get();
    if (!result.data || !result.exists) {
      throw Error("Failed to get user");
    }
    return result.data as unknown as MeetRequest;
  }

  async getMatch(id: string): Promise<Match> {
    const result = await this.matchesCollection.doc(id).get();
    if (!result.data || !result.exists) {
      throw Error("Failed to get user");
    }
    return result.data as unknown as Match;
  }

  async addToMeetupHistory(id: string, meetup: MeetRequest, match: Match) {
    await this.usersCollection.doc(id).update({
      meetUpHistory: firestore.FieldValue.arrayUnion({ meetup, match }),
    });
  }

  async addRequest(request: MeetRequest): Promise<string> {
    const result = await this.requestsCollection.add({
      ...request,
      id: undefined,
    });
    return result.id;
  }

  async deleteRequest(id: string) {
    await this.requestsCollection.doc(id).delete();
  }

  async getRequests(): Promise<MeetRequest[]> {
    const result = await this.requestsCollection.get();
    return result.docs.map(
      (item) => ({ ...item.data, id: item.id } as MeetRequest)
    );
  }

  async addMatch(match: Match): Promise<string> {
    const result = await this.matchesCollection.add({
      ...match,
      id: undefined,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
    return result.id;
  }

  async acceptMatch(userId: string, matchId: string) {
    const result = await this.matchesCollection.doc(matchId).get();
    if (!result.data) {
      throw Error("No match with given id");
    }
    const match = result.data as unknown as Match;
    if (match.user1.id === userId) {
      await this.matchesCollection
        .doc(matchId)
        .update({ user1Status: "accepted" });
    } else {
      await this.matchesCollection
        .doc(matchId)
        .update({ user2Status: "accepted" });
    }
  }

  async deleteMatch(id: string) {
    await this.matchesCollection.doc(id).delete();
  }

  async deleteMatchesOfUser(id: string) {
    let userMatches = await this.matchesCollection
      .where("user1.id", "==", id)
      .get();
    for (const request of userMatches.docs) {
      await request.ref.delete();
    }

    userMatches = await this.matchesCollection
      .where("user2.id", "==", id)
      .get();
    for (const request of userMatches.docs) {
      await request.ref.delete();
    }
  }

  async deletMatchesForRequest(requestId: string) {
    const requestMatches = await this.matchesCollection
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
    const unsubscribe = this.matchesCollection
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
}
