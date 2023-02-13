import { CommentWrapType } from "./commentWrapType";

export type ProfileVideoType = {
  id: number;
  userPK: number;
  userId: string;
  nickName: string;
  avatar: string | null;
  title: string;
  views: number;
  pathUrl: string;
  createDate: Date;
  hashtags: string;
  comments: CommentWrapType;
  thumbnail: string | null;
};
