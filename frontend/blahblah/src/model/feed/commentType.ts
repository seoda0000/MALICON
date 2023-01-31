export type CommentType = {
  id: number;
  content: string;
  createDate: string;
  lastModifiedDate: string;

  articleId: number;

  userPK: number;
  userId: string;
  //   userAvatar: string | null;
  //   userNickName: string;
};