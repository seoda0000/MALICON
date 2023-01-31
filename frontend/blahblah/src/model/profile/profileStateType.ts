import { ReduxStateType } from "../reduxStateType";
import { ProfileFeedType } from "./profileFeedType";
import { ProfileUserType } from "./profileUserType";
import { VideoType } from "./VideoType";

export type ProfileStateType = {
  userData: ProfileUserType;
  isSubscribing: boolean;
  feedData: ProfileFeedType[] | null;
  videoData: VideoType[] | null;
  getAboutMe: ReduxStateType;
  getIsSub: ReduxStateType;
  subscribe: ReduxStateType;
  unSubscribe: ReduxStateType;
  getFeed: ReduxStateType;
  getVideo?: ReduxStateType;
  getIsOnAir?: ReduxStateType;
};

