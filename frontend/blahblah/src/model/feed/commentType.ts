export type CommentType = {
  id: number;
  content: string;
  createDate: string;
  lastModifiedDate: string;

  articleId?: number;
  videoId?: number;

  userPK: number;
  userId: string;
  avatar?: string;
  nickName: string;
};
