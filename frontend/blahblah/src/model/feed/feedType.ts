export type FeedType = {
  id: number;
  title: string;
  content: string;
  createDate: string;
  lastModifiedDate: string;

  userId: string;
  userAvatar: string | null;
  userNickName: string;
};
