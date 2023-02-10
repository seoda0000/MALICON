import { ReduxStateType } from "../reduxStateType";
import { SubscriberType } from "../subscribe/subscriberType";
import { ProfileFeedType } from "./profileFeedType";
import { ProfileUserType } from "./profileUserType";
import { ProfileVideoType } from "./profileVideoType";

export type ProfileStateType = {
  userData: ProfileUserType;
  isSubscribing: boolean;
  feedData: ProfileFeedType[] | null;
  videoData: ProfileVideoType[];
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

