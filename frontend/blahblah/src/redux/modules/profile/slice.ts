import { createSlice } from "@reduxjs/toolkit";
import { ProfileStateType } from "../../../model/profile/profileStateType";
import { SubscriberType } from "../../../model/subscribe/subscriberType";
import {
  getIsSubscribeAction,
  getAboutMeAction,
  subscribeAction,
  unSubscribeAction,
  getFeedAction,
  updateAboutMeAction,
  addAboutMeAction,
  getSubscribersAction,
  getVideoAction,
} from "./thunk";

const initialState: ProfileStateType = {
  userData: {
    userPK: -1,
    userId: "",
    nickName: "",
    avatar: "",
    aboutMe: "",
    subscribers: 0,
    isOnAir: false,
  },
  isSubscribing: false,
  subscribers: [],
  feedData: null,
  videoData: [],
  getAboutMe: { loading: false, data: null, error: null },
  addAboutMe: { loading: false, data: null, error: null },
  updateAboutMe: { loading: false, data: null, error: null },
  getIsSub: { loading: false, data: null, error: null },
  getSub: { loading: false, data: null, error: null },
  subscribe: { loading: false, data: null, error: null },
  unSubscribe: { loading: false, data: null, error: null },
  getFeed: { loading: false, data: null, error: null },
  getVideo: { loading: false, data: null, error: null },
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
      .addCase(getSubscribersAction.pending, (state) => {
        state.getSub.loading = true;
        state.getSub.data = null;
        state.getSub.error = null;
      })
      .addCase(getSubscribersAction.fulfilled, (state, { payload }) => {
        state.getSub.loading = false;
        state.getSub.data = payload;
        state.getSub.error = null;

        state.subscribers = payload;
      })
      .addCase(getSubscribersAction.rejected, (state, { payload }) => {
        state.getSub.loading = false;
        state.getSub.data = null;
        state.getSub.error = payload;
      })
      .addCase(addAboutMeAction.pending, (state) => {
        state.addAboutMe.loading = true;
        state.addAboutMe.data = null;
        state.addAboutMe.error = null;
      })
      .addCase(addAboutMeAction.fulfilled, (state, { payload }) => {
        state.addAboutMe.loading = false;
        state.addAboutMe.data = payload;
        state.addAboutMe.error = null;
      })
      .addCase(addAboutMeAction.rejected, (state, { payload }) => {
        state.addAboutMe.loading = false;
        state.addAboutMe.data = null;
        state.addAboutMe.error = payload;
      })
      .addCase(updateAboutMeAction.pending, (state) => {
        state.updateAboutMe.loading = true;
        state.updateAboutMe.data = null;
        state.updateAboutMe.error = null;
      })
      .addCase(updateAboutMeAction.fulfilled, (state, { payload }) => {
        state.updateAboutMe.loading = false;
        state.updateAboutMe.data = payload;
        state.updateAboutMe.error = null;
      })
      .addCase(updateAboutMeAction.rejected, (state, { payload }) => {
        state.updateAboutMe.loading = false;
        state.updateAboutMe.data = null;
        state.updateAboutMe.error = payload;
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

        const sub = state.getIsSub.data.filter(
          (subscriber: SubscriberType) =>
            subscriber.userPK === state.userData.userPK
        );
        console.log(state.getIsSub.data);
        console.log(sub);
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
        state.userData.subscribers += 1;
        state.subscribers.push({
          userPK: state.userData.userPK,
          userId: state.userData.userId,
          nickName: state.userData.nickName,
          avatar: state.userData.avatar,
        });
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
        state.userData.subscribers -= 1;
        state.subscribers.forEach((subscriber, idx) => {
          if (subscriber.userPK === state.userData.userPK) {
            state.subscribers.splice(idx, 1);
          }
        });
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

        // state.feedData = payload; ///////////
      })
      .addCase(getFeedAction.rejected, (state, { payload }) => {
        state.getFeed.loading = false;
        state.getFeed.data = null;
        state.getFeed.error = payload;
      })
      .addCase(getVideoAction.pending, (state) => {
        state.getVideo.loading = true;
        state.getVideo.data = null;
        state.getVideo.error = null;
      })
      .addCase(getVideoAction.fulfilled, (state, { payload }) => {
        state.getVideo.loading = false;
        state.getVideo.data = payload;
        state.getVideo.error = null;

        state.videoData = payload;
      })
      .addCase(getVideoAction.rejected, (state, { payload }) => {
        state.getVideo.loading = false;
        state.getVideo.data = null;
        state.getVideo.error = payload;
      });
  },
});

export default profileSlice.reducer;

