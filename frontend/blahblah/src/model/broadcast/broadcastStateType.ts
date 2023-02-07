import { SessionType } from "./sessionType";
import { StreamerType } from "./streamerType";
export type BroadcastStateType = {
  sessions: SessionType[];
  isViewed: boolean;

  // 현재 세션 정보
  currentSession: SessionType;
};
