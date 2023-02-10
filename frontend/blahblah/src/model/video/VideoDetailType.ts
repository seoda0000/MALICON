import { CommentType } from "../feed/commentType";
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

  // 디테일
  like: boolean;
  likeCnt: number;
  comments: CommentType[];
};
