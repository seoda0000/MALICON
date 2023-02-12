import { ReduxStateType } from "../reduxStateType";
import { SubscriberType } from "../subscribe/subscriberType";
import { FeedWrapType } from "./feedWrapType";
import { ProfileFeedType } from "./profileFeedType";
import { ProfileUserType } from "./profileUserType";
import { ProfileVideoType } from "./profileVideoType";
import { VideoWrapType } from "./videoWrapType";

export type ProfileStateType = {
  userData: ProfileUserType;
  isSubscribing: boolean;
  videoData: VideoWrapType | null;
  feedData: FeedWrapType | null;
  getAboutMe: ReduxStateType;
  addAboutMe: ReduxStateType;
  updateAboutMe: ReduxStateType;
  getIsOnAir: ReduxStateType;
  getIsSub: ReduxStateType;
  subscribe: ReduxStateType;
  unSubscribe: ReduxStateType;
  getFeed: ReduxStateType;
  getVideo: ReduxStateType;
  subscribers: SubscriberType[];
  getSub: ReduxStateType;
};

