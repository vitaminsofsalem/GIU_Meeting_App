import { User } from "./User";

export interface MeetRequest {
  id?: string;
  requestCreator: User;
  meetLocation: string;
  endTime: number; //time in millis;
  activity: string;
}
