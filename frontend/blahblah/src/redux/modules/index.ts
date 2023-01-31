import { combineReducers } from "redux";
import user from "./user/slice";
import profile from "./profile/slice";

export const reducer = combineReducers({
  user,
  profile,
});

