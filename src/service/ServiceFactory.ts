import { FirebaseAuth } from "./FirebaseAuth";
import { FirebaseDatabase } from "./FirebaseDatabase";

export class ServiceFactory {
  private static firebaseAuthInstance?: FirebaseAuth;
  private static firebaseDatabaseInstance?: FirebaseDatabase;

  static getFirebaseAuth(): FirebaseAuth {
    if (!this.firebaseAuthInstance) {
      this.firebaseAuthInstance = new FirebaseAuth();
    }
    return this.firebaseAuthInstance;
  }

  static getFirebaseDatabase(): FirebaseDatabase {
    if (!this.firebaseDatabaseInstance) {
      this.firebaseDatabaseInstance = new FirebaseDatabase();
    }
    return this.firebaseDatabaseInstance;
  }
}
