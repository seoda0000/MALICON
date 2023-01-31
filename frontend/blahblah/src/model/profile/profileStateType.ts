import { FeedType } from "../feed/feedType";
import { ReduxStateType } from "../reduxStateType";
import { ProfileUserType } from "./profileUserType";
import { VideoType } from "./VideoType";

export type ProfileStateType = {
  userData: ProfileUserType;
  feedData: FeedType[] | null;
  videoData: VideoType[] | null;
  getProfile: ReduxStateType;
  getFeed?: ReduxStateType;
  getVideo?: ReduxStateType;
  getIsOnAir?: ReduxStateType;
};

