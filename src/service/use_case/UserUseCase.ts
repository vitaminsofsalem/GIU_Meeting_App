import storage from "@react-native-firebase/storage";
import { User } from "../../model/User";
import { ServiceFactory } from "../ServiceFactory";
import messaging from "@react-native-firebase/messaging";

export class UserUseCase {
  private auth = ServiceFactory.getFirebaseAuth();
  private db = ServiceFactory.getFirebaseDatabase();

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
    await this.db.addFCMToken(user.uid, await messaging().getToken());
  }

  async logIn(email: string, password: string) {
    const user = await this.auth.loginWithEmailAndPassword(email, password);
    await this.db.addFCMToken(user.uid, await messaging().getToken());
  }

  async logOut() {
    const user = this.auth.getCurrentUser();
    if (!user) {
      throw Error("Already logged out");
    }
    await this.db.deletFCMToken(user.uid, await messaging().getToken());
    this.auth.logOut();
  }

  async uploadUserPhoto(photoFilePath: string) {
    const user = this.auth.getCurrentUser();
    if (!user) {
      throw Error("Can't upload photo when not logged in");
    }
    const photoRef = storage().ref(`${user.uid}/profile.png`);
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
    await this.db.updateUserIntrests(user.uid, intrests);
  }

  async getCurrentUser(): Promise<User> {
    const user = this.auth.getCurrentUser();
    if (!user) {
      throw Error("Can't get user when not logged in");
    }
    return await this.db.getUser(user.uid);
  }
}
