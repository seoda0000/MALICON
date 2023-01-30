import { createSlice } from "@reduxjs/toolkit";
import { UserStateType } from "../../../model/user/userStateType";
import {
  checkDuplicateAction,
  getMeWithTokenAction,
  refreshTokenAction,
  signinAction,
  signupAction,
} from "./thunk";

const initialState: UserStateType = {
  userData: {
    id: null,
    userId: "",
    password: "",
    nickName: "",
    email: "",
    phoneNumber: null,
    avatar: null,
    lightStick: null,
    // accessToken: "",
    // refreshToken: "",
    isLoggedIn: false,
  },
  signup: { loading: false, data: null, error: null },
  checkDuplicate: { loading: false, data: null, error: null },
  signin: { loading: false, data: null, error: null },
  getMe: { loading: false, data: null, error: null },
  refreshToken: { loading: false, data: null, error: null },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupAction.pending, (state) => {
        state.signup.loading = true;
        state.signup.data = null;
        state.signup.error = null;
      })
      .addCase(signupAction.fulfilled, (state, { payload }) => {
        state.signup.loading = false;
        state.signup.data = payload;
        state.signup.error = null;
      })
      .addCase(signupAction.rejected, (state, { payload }) => {
        state.signup.loading = false;
        state.signup.data = null;
        state.signup.error = payload;
      })
      .addCase(checkDuplicateAction.pending, (state) => {
        state.checkDuplicate.loading = true;
        state.checkDuplicate.data = null;
        state.checkDuplicate.error = null;
      })
      .addCase(checkDuplicateAction.fulfilled, (state, { payload }) => {
        state.checkDuplicate.loading = false;
        state.checkDuplicate.data = payload;
        state.checkDuplicate.error = null;
      })
      .addCase(checkDuplicateAction.rejected, (state, { payload }) => {
        state.checkDuplicate.loading = false;
        state.checkDuplicate.data = null;
        state.checkDuplicate.error = payload;
      })
      .addCase(signinAction.pending, (state) => {
        state.signin.loading = true;
        state.signin.data = null;
        state.signin.error = null;
      })
      .addCase(signinAction.fulfilled, (state, { payload }) => {
        state.signin.loading = false;
        state.signin.data = payload;
        state.signin.error = null;
      })
      .addCase(signinAction.rejected, (state, { payload }) => {
        state.signin.loading = false;
        state.signin.data = null;
        state.signin.error = payload;
      })
      .addCase(getMeWithTokenAction.pending, (state) => {
        state.getMe.loading = true;
        state.getMe.data = null;
        state.getMe.error = null;
      })
      .addCase(getMeWithTokenAction.fulfilled, (state, { payload }) => {
        state.getMe.loading = false;
        state.getMe.data = payload;
        state.getMe.error = null;

        state.userData.id = payload.id;
        state.userData.userId = payload.userId;
        state.userData.email = payload.email;
        state.userData.nickName = payload.nickName;
        state.userData.phoneNumber = payload.phoneNumber;
        state.userData.avatar = payload.avatar;
        state.userData.lightStick = payload.lightStick;
        state.userData.isLoggedIn = true;
      })
      .addCase(getMeWithTokenAction.rejected, (state, { payload }) => {
        state.getMe.loading = false;
        state.getMe.data = null;
        state.getMe.error = payload;
      })
      .addCase(refreshTokenAction.pending, (state) => {
        state.refreshToken.loading = true;
        state.refreshToken.data = null;
        state.refreshToken.error = null;
      })
      .addCase(refreshTokenAction.fulfilled, (state, { payload }) => {
        state.refreshToken.loading = false;
        state.refreshToken.data = payload;
        state.refreshToken.error = null;
      })
      .addCase(refreshTokenAction.rejected, (state, { payload }) => {
        state.refreshToken.loading = false;
        state.refreshToken.data = null;
        state.refreshToken.error = payload;
      });
  },
});

export default userSlice.reducer;

