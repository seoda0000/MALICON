import { UserType } from "./userType";

export type UserStateType = {
  userData: UserType;
  signup: {
    loading: boolean | null;
    data: any | null;
    error: Error | null | any;
  };
};

