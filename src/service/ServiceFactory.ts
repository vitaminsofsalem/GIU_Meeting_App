import { FirebaseAuth } from "./FirebaseAuth";
import { FirebaseDatabase } from "./FirebaseDatabase";
import { MatchUseCase } from "./use_case/match_use_case/MatchUseCase";
import { MatchUseCaseImpl } from "./use_case/match_use_case/MatchUseCaseImpl";
import { UserUseCase } from "./use_case/UserUseCase";

export class ServiceFactory {
  static firebaseAuthInstance?: FirebaseAuth;
  static firebaseDatabaseInstance?: FirebaseDatabase;
  static matchUseCaseInstance?: MatchUseCase;
  static userUseCaseInstance?: UserUseCase;

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

  static getMatchUseCase(): MatchUseCase {
    if (!this.matchUseCaseInstance) {
      this.matchUseCaseInstance = new MatchUseCaseImpl();
    }
    return this.matchUseCaseInstance;
  }

  static getUserUseCase(): UserUseCase {
    if (!this.userUseCaseInstance) {
      this.userUseCaseInstance = new UserUseCase();
    }
    return this.userUseCaseInstance;
  }
}
