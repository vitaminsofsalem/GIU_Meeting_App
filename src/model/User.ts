import { MeetRequest } from "./MeetRequest";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  email: string;
  photoUrl?: string;
  intrests: string[];
  meetUpHistory: MeetRequest[];
  currentRequest?: string;
  fcmTokens?: string[];
}
