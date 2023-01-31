import { createSlice } from "@reduxjs/toolkit";
import { ProfileStateType } from "../../../model/profile/profileStateType";
import { SubscriberType } from "../../../model/subscribe/subscriberType";
import {
  getIsSubscribeAction,
  getAboutMeAction,
  subscribeAction,
  unSubscribeAction,
  getFeedAction,
} from "./thunk";

const initialState: ProfileStateType = {
  userData: {
    userPK: null,
    userId: "",
    nickName: "",
    avatar: null,
    aboutMe: "",
    subscribers: 0,
    isOnAir: false,
  },
  isSubscribing: false,
  feedData: null,
  videoData: null,
  getAboutMe: { loading: false, data: null, error: null },
  getIsSub: { loading: false, data: null, error: null },
  subscribe: { loading: false, data: null, error: null },
  unSubscribe: { loading: false, data: null, error: null },
  getFeed: { loading: false, data: null, error: null },
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAboutMeAction.pending, (state) => {
        state.getAboutMe.loading = true;
        state.getAboutMe.data = null;
        state.getAboutMe.error = null;
      })
      .addCase(getAboutMeAction.fulfilled, (state, { payload }) => {
        state.getAboutMe.loading = false;
        state.getAboutMe.data = payload;
        state.getAboutMe.error = null;

        state.userData.userPK = payload.userPK;
        state.userData.userId = payload.userId;
        state.userData.nickName = payload.nickName;
        state.userData.avatar = payload.avatar;
        state.userData.aboutMe = payload.aboutMe;
        state.userData.subscribers = payload.subscribers;
      })
      .addCase(getAboutMeAction.rejected, (state, { payload }) => {
        state.getAboutMe.loading = false;
        state.getAboutMe.data = null;
        state.getAboutMe.error = payload;
      })
      .addCase(getIsSubscribeAction.pending, (state, { payload }) => {
        state.getIsSub.loading = true;
        state.getIsSub.data = null;
        state.getIsSub.error = null;
      })
      .addCase(getIsSubscribeAction.fulfilled, (state, { payload }) => {
        state.getIsSub.loading = false;
        state.getIsSub.data = payload;
        state.getIsSub.error = null;

        const sub = payload.filter(
          (subscriber: SubscriberType) =>
            subscriber.userPK === state.userData.userPK
        );
        if (sub.length === 0) {
          state.isSubscribing = false;
        } else {
          state.isSubscribing = true;
        }
      })
      .addCase(getIsSubscribeAction.rejected, (state, { payload }) => {
        state.getIsSub.loading = false;
        state.getIsSub.data = null;
        state.getIsSub.error = payload;
      })
      .addCase(subscribeAction.pending, (state) => {
        state.subscribe.loading = true;
        state.subscribe.data = null;
        state.subscribe.error = null;
      })
      .addCase(subscribeAction.fulfilled, (state, { payload }) => {
        state.subscribe.loading = false;
        state.subscribe.data = payload;
        state.subscribe.error = null;

        state.isSubscribing = true;
      })
      .addCase(subscribeAction.rejected, (state, { payload }) => {
        state.subscribe.loading = false;
        state.subscribe.data = null;
        state.subscribe.error = payload;
      })
      .addCase(unSubscribeAction.pending, (state) => {
        state.unSubscribe.loading = true;
        state.unSubscribe.data = null;
        state.unSubscribe.error = null;
      })
      .addCase(unSubscribeAction.fulfilled, (state, { payload }) => {
        state.unSubscribe.loading = false;
        state.unSubscribe.data = payload;
        state.unSubscribe.error = null;

        state.isSubscribing = false;
      })
      .addCase(unSubscribeAction.rejected, (state, { payload }) => {
        state.unSubscribe.loading = false;
        state.unSubscribe.data = null;
        state.unSubscribe.error = payload;
      })
      .addCase(getFeedAction.pending, (state) => {
        state.getFeed.loading = true;
        state.getFeed.data = null;
        state.getFeed.error = null;
      })
      .addCase(getFeedAction.fulfilled, (state, { payload }) => {
        state.getFeed.loading = false;
        state.getFeed.data = payload;
        state.getFeed.error = null;

        state.feedData = payload;
      })
      .addCase(getFeedAction.rejected, (state, { payload }) => {
        state.getFeed.loading = false;
        state.getFeed.data = null;
        state.getFeed.error = payload;
      });
  },
});

export default profileSlice.reducer;

