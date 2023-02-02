import { ReduxStateType } from "../reduxStateType";
import { UserType } from "./userType";

export type UserStateType = {
  userData: UserType;
  signup: ReduxStateType;
  checkDuplicate: ReduxStateType;
  checkDupNickName: ReduxStateType;
  signin: ReduxStateType;
  getMe: ReduxStateType;
  refreshToken: ReduxStateType;
  updateUser: ReduxStateType;
  deleteUser: ReduxStateType;
};

