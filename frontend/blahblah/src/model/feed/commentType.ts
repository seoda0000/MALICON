export type CommentType = {
  id: number;
  title: string;
  content: string;
  createDate: string;
  lastModifiedDate: string;

  articleId: number;

  userPK: number;
  userId: string;
  //   userAvatar: string | null;
  //   userNickName: string;
};
