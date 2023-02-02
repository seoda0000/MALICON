import { CommentType } from "../feed/commentType";

export type ProfileFeedType = {
  id: number;
  title: string;
  content: string;
  createDate: string;
  lastModifiedDate: string;
  commentList?: CommentType[];
};

