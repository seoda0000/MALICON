import { createSlice } from "@reduxjs/toolkit";
import { ProfileStateType } from "../../../model/profile/profileStateType";
import { getProfileAction } from "./thunk";

const initialState: ProfileStateType = {
  userData: {
    id: null,
    userId: "",
    nickName: "",
    avatar: null,
    content: null,
    follower: 0,
    isOnAir: false,
  },
  feedData: null,
  videoData: null,
  getProfile: { loading: false, data: null, error: null },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfileAction.pending, (state) => {
        state.getProfile.loading = true;
        state.getProfile.data = null;
        state.getProfile.error = null;
      })
      .addCase(getProfileAction.fulfilled, (state, { payload }) => {
        state.getProfile.loading = false;
        state.getProfile.data = payload;
        state.getProfile.error = null;

        state.userData.id = payload.id;
        state.userData.userId = payload.userId;
        state.userData.nickName = payload.nickName;
        state.userData.avatar = payload.avatar;
        state.userData.content = payload.content;
        state.userData.follower = payload.follower;
      })
      .addCase(getProfileAction.rejected, (state, { payload }) => {
        state.getProfile.loading = false;
        state.getProfile.data = null;
        state.getProfile.error = payload;
      });
  },
});

export default profileSlice.reducer;

