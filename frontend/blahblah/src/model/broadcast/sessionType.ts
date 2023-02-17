import { StreamerType } from "./streamerType";

export type SessionType = {
  sessionId: string;
  title: string;
  viewNumber: number;
  startAt: string;
  thumbnail: string;
  streamer: StreamerType;
  hashTag: string;
  avatar?: string;
};

