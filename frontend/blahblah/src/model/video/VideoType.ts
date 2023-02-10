import { CommentType } from "../feed/commentType";
export type VideoType = {
  id: number;
  userPK: number;
  userId: string;
  nickName: string;
  avatar: string | null;
  title: string;
  views: number;
  pathUrl: string;
  createDate: string;
  hashtags: string;
  like: boolean;
  likeCnt: number;
  thumbnail: string | null;

  // comments: CommentType[];
};

