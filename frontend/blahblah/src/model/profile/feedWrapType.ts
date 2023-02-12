import { PageableType } from "./pageableType";
import { ProfileFeedType } from "./profileFeedType";

export type FeedWrapType = {
  content: ProfileFeedType[];
  pageable: PageableType;
  last: boolean;
  totalElement: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};

