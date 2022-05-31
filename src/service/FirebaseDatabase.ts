import firestore from "@react-native-firebase/firestore";
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

  db = firestore();
  usersCollection = this.db.collection("users");
  requestsCollection = this.db.collection("requests");

  async addUser(user: User) {
    await this.usersCollection.doc(user.id).set(user);
  }

  async updateUserPhoto(id: string, photoUrl: string) {
    await this.usersCollection.doc(id).update({ photoUrl });
  }

  async updateIntrests(id: string, intrests: string[]) {
    await this.usersCollection.doc(id).update({ intrests });
  }

  async getUser(id: string): Promise<User> {
    const result = await this.usersCollection.doc(id).get();
    if (!result.data || !result.exists) {
      throw Error("Failed to get user");
    }
    return result.data as unknown as User;
  }

  async addToMeetupHistory(id: string, meetup: MeetRequest) {
    await this.usersCollection
      .doc(id)
      .update({ meetUpHistory: firestore.FieldValue.arrayUnion(meetup) });
  }

  async addRequest(request: MeetRequest) {
    await this.requestsCollection.add(request);
  }

  subscribeToRequests(
    onRequestsUpdated: (requests: MeetRequest[]) => void
  ): () => void {
    const unsubscribe = this.requestsCollection.onSnapshot((result) => {
      if (!result.empty) {
        onRequestsUpdated(
          result.docs.map((item) => item as unknown as MeetRequest)
        );
      }
    });
    return unsubscribe;
  }
}
