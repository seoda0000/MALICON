import { ReduxType } from "../reduxType";
import { UserType } from "./userType";

export type UserStateType = {
  userData: UserType;
  signup: ReduxType;
  checkDuplicate: ReduxType;
  signin: ReduxType;
};

