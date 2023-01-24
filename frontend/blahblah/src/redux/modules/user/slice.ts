import { createSlice } from "@reduxjs/toolkit";
import { UserStateType } from "../../../model/user/userStateType";
import { checkDuplicateAction, signinAction, signupAction } from "./thunk";

const initialState: UserStateType = {
  userData: {
    userId: "",
    password: "",
    nickName: "",
    email: "",
    phone: "",
    accessToken: "",
    refreshToken: "",
    isLoggedIn: false,
  },
  signup: { loading: false, data: null, error: null },
  checkDuplicate: { loading: false, data: null, error: null },
  signin: { loading: false, data: null, error: null },
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
        state.userData.userId = payload.userId;
        state.userData.password = payload.password;
        state.userData.email = payload.email;
        state.userData.nickName = payload.nickName;
        state.userData.phone = payload.password;
        state.userData.accessToken = payload.accessToken;
        state.userData.refreshToken = payload.refreshToken;
        state.userData.isLoggedIn = true;
      })
      .addCase(signinAction.rejected, (state, { payload }) => {
        state.signin.loading = false;
        state.signin.data = null;
        state.signin.error = payload;
      });
  },
});

export default userSlice.reducer;

