import { CommentType } from "../feed/commentType";
import { PageableType } from "./pageableType";

export type CommentWrapType = {
  content: CommentType[];
  pageable: PageableType;
  last: boolean;
  totalElement: number;
  totalPages: number;
  size: number;
  first: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  empty: boolean;
};

