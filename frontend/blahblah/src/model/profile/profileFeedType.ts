import { CommentWrapType } from "./commentWrapType";

export type ProfileFeedType = {
  id: number;
  userPK: number;
  userId: string;
  nickName: string;
  avatar: string | null;
  title: string;
  content: string;
  createDate: Date;
  lastModifiedDate: Date;
  like: boolean;
  likeCnt: number;
  commentList: CommentWrapType;
};
