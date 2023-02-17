import { SessionType } from "../broadcast/sessionType";

export type SubscriberType = {
  userPK: number;
  userId: string;
  nickName: string;
  avatar: string;
  isOnAir?: SessionType;
};

