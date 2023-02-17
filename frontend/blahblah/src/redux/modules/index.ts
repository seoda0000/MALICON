import { combineReducers } from "redux";
import user from "./user/slice";
import profile from "./profile/slice";
import video from "./video/video-slice";
import feed from "./feed/feed-slice";
import broadcast from "./broadcast/broadcast-slice";
export const reducer = combineReducers({
  user,
  profile,
  feed,
  video,
  broadcast,
});

