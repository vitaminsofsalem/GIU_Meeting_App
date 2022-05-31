import { User } from "./User";

export interface MeetRequest {
  requestCreator: User;
  meetLocation: string;
  startTime: number; //time in milliseconds
  endTime: number;
  activity: string;
  numberOfAccepts: 0 | 1 | 2; //Either accepted by none, one, or both
  pendingMatch?: User;
  acceptedMatch?: User;
}
