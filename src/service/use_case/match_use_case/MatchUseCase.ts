import { Match } from "../../../model/Match";

export interface MatchUseCase {
  /**
   * Creates a new 'Request' record on the database
   * And searches existing requests for a match, and creates a 'Match' record if it finds any
   */
  matchAndCreateRequest(
    meetLocation: string,
    endTimeMillis: number,
    activity: string
  ): Promise<void>;

  /**
   * Subscribes to matches of current user. Gives only one match at a given time.
   * Provides matches that need user action, for example ones that are pending user acceptance/rejection.
   *
   * If there exists a match where both users have already accepted. This one is returned and takes priority over the rest, and the rest are deleted.
   *
   * @param onMatchChange callback to when the given match changes
   * @returns function for unsubscribing from changes
   */
  subscribeToMatch(onMatchChange: (match?: Match) => void): Promise<() => void>;

  acceptMatch(matchId: string): Promise<void>;

  rejectMatch(matchId: string): Promise<void>;

  finishMeeting(matchId: string): Promise<void>;

  cancelRequest(): Promise<void>;
}
