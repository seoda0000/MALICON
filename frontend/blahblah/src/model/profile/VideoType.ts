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
  createDate: Date;
  hashtags: string;
  comments: {
    content: CommentType[];
    pageable: {
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
    };
  };
};

