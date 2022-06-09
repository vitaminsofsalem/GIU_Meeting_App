import { MatchUseCase } from "./use_case/match_use_case/MatchUseCase";
import { MatchUseCaseImpl } from "./use_case/match_use_case/MatchUseCaseImpl";
import { UserUseCase } from "./use_case/user_use_case/UserUseCase";
import { UserUseCaseImpl } from "./use_case/user_use_case/UserUseCaseImpl";

export class UseCaseFactory {
  static matchUseCaseInstance?: MatchUseCase;
  static userUseCaseInstance?: UserUseCase;

  static getMatchUseCase(): MatchUseCase {
    if (!this.matchUseCaseInstance) {
      this.matchUseCaseInstance = new MatchUseCaseImpl();
    }
    return this.matchUseCaseInstance;
  }

  static getUserUseCase(): UserUseCase {
    if (!this.userUseCaseInstance) {
      this.userUseCaseInstance = new UserUseCaseImpl();
    }
    return this.userUseCaseInstance;
  }
}
