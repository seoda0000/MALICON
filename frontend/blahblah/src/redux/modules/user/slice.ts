import { createSlice } from "@reduxjs/toolkit";
import { UserStateType } from "../../../model/user/userStateType";
import { signupAction } from "./thunk";

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
      });
  },
});

export default userSlice.reducer;

