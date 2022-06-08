import { User } from "./User";

type MatchStatus = "pending" | "accepted";

export interface Match {
  id: string;
  user1: User;
  user2: User;
  user1Status: MatchStatus;
  user2Status: MatchStatus;
  forRequests: string[];
}
