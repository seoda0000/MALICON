import { CommentType } from "../feed/commentType";
import { VideoEmotionType } from "./VideoEmotionType";
export type VideoDetailType = {
  id: number;
  userPK: number;
  userId: string;
  nickName: string;
  avatar: string;
  title: string;
  views: number;
  pathUrl: string;
  createDate: string;
  hashtags: string;
  thumbnail: string | null;
  recordingId: number;

  // 디테일
  like: boolean;
  likeCnt: number;
  comments: CommentType[];
  recordingId: string | null;

  // 아바타 감정표현
  emotionLog?: VideoEmotionType[];
};
