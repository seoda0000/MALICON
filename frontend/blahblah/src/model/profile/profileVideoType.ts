import { CommentWrapType } from "./commentWrapType";

export type ProfileVideoType = {
  id: number;
  userPK: number;
  userId: string;
  nickName: string;
  avatar: string | null;
  title: string;
  views: number;
  recordingId: string;
  sessionId: string;
  timeStamp: number;
  playTime: number;
  thumbnail: string | null;
  pathUrl: string;
  createDate: Date;
  hashtags: string;
  like: boolean;
  likeCnt: number;
  comments: CommentWrapType;
};

