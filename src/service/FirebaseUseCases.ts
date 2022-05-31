import { FirebaseAuth } from "./FirebaseAuth";
import { FirebaseDatabase } from "./FirebaseDatabase";
import storage from "@react-native-firebase/storage";
import { MeetRequest } from "../model/MeetRequest";
import { User } from "../model/User";

export class FirebaseUseCases {
  static instance?: FirebaseUseCases;

  static getInstance(): FirebaseUseCases {
    if (!this.instance) {
      this.instance = new FirebaseUseCases();
    }
    return this.instance;
  }

  auth = FirebaseAuth.getInstance();
  db = FirebaseDatabase.getInstance();
  storageRef = storage();

  async createAccount(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    gender: "male" | "female"
  ) {
    const user = await this.auth.registerWithEmailAndPassword(
      email,
      password,
      `${firstName} ${lastName}`
    );
    await this.db.addUser({
      email,
      firstName,
      lastName,
      gender,
      id: user.uid,
      intrests: [],
      meetUpHistory: [],
    });
  }

  async logIn(email: string, password: string) {
    await this.auth.loginWithEmailAndPassword(email, password);
  }

  async uploadUserPhoto(photoFilePath: string) {
    const user = this.auth.getCurrentUser();
    if (!user) {
      throw Error("Can't upload photo when not logged in");
    }
    const photoRef = this.storageRef.ref(`${user.uid}/profile.png`);
    await photoRef.putFile(photoFilePath);
    const downloadUrl = await photoRef.getDownloadURL();
    await this.auth.updateUserPhoto(downloadUrl);
    await this.db.updateUserPhoto(user.uid, downloadUrl);
  }

  async updateIntrests(intrests: string[]) {
    const user = this.auth.getCurrentUser();
    if (!user) {
      throw Error("Can't update intrests when not logged in");
    }
    await this.db.updateIntrests(user.uid, intrests);
  }

  async addToMeetupHistory(meetup: MeetRequest) {
    const user = this.auth.getCurrentUser();
    if (!user) {
      throw Error("Can't add to history when not logged in");
    }
    await this.db.addToMeetupHistory(user.uid, meetup);
  }

  async getUser(): Promise<User> {
    const user = this.auth.getCurrentUser();
    if (!user) {
      throw Error("Can't get user when not logged in");
    }
    return await this.db.getUser(user.uid);
  }

  async createRequestAndWaitForMatch() {
    const unsubscribe = this.db.subscribeToRequests(() => {});
    //TODO: Implement match logic
  }
}
