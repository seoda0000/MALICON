import { ReduxStateType } from "../reduxStateType";
import { SubscriberType } from "../subscribe/subscriberType";
import { ProfileFeedType } from "./profileFeedType";
import { ProfileUserType } from "./profileUserType";
import { VideoType } from "./VideoType";

export type ProfileStateType = {
  userData: ProfileUserType;
  isSubscribing: boolean;
  feedData: ProfileFeedType[] | null;
  videoData: VideoType[];
  getAboutMe: ReduxStateType;
  addAboutMe: ReduxStateType;
  updateAboutMe: ReduxStateType;
  getIsSub: ReduxStateType;
  subscribe: ReduxStateType;
  unSubscribe: ReduxStateType;
  getFeed: ReduxStateType;
  getVideo: ReduxStateType;
  getIsOnAir?: ReduxStateType;
  subscribers: SubscriberType[];
  getSub: ReduxStateType;
};

