import { FeedType } from "../feed/feedType";
import { ReduxStateType } from "../reduxStateType";
import { ProfileUserType } from "./profileUserType";
import { VideoType } from "./VideoType";

export type ProfileStateType = {
  userData: ProfileUserType;
  isSubscribing: boolean;
  feedData: FeedType[] | null;
  videoData: VideoType[] | null;
  getAboutMe: ReduxStateType;
  getIsSub: ReduxStateType;
  subscribe: ReduxStateType;
  unSubscribe: ReduxStateType;
  getFeed?: ReduxStateType;
  getVideo?: ReduxStateType;
  getIsOnAir?: ReduxStateType;
};

