import { ReduxStateType } from "../reduxStateType";
import { SubscriberType } from "./subscriberType";

export type SubscribeStateType = {
  subscribers: SubscriberType[];
  getSub: ReduxStateType;
};

