import { User } from "../../../model/User";

export interface UserUseCase {
  createAccount(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    gender: "male" | "female"
  ): Promise<void>;

  logIn(email: string, password: string): Promise<void>;

  logOut(): Promise<void>;

  uploadUserPhoto(photoFilePath: string): Promise<void>;

  updateIntrests(intrests: string[]): Promise<void>;

  getCurrentUser(): Promise<User>;
}
