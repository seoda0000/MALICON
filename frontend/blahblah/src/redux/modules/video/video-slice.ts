import { createSlice } from "@reduxjs/toolkit";
import { SessionType } from "../../../model/broadcast/sessionType";
import { VideoStateType } from "../../../model/video/VideoStateType";

const initialState: VideoStateType = {
  allVideoList: [],
  followingVideoList: [],
  currentVideo: {
    id: 0,
    userPK: 0,
    userId: "",
    nickName: "",
    avatar: "",

    title: "",
    views: 0,
    pathUrl: "",
    createDate: "",
    hashtags: "",
    like: false,
    likeCnt: 0,
    thumbnail: "",
    recordingId: "",
    comments: [],
  },
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    replaceAllVideos(state, action) {
      state.allVideoList = action.payload.allVideoList;
    },
    replaceFollowingVideos(state, action) {
      state.followingVideoList = action.payload.followingVideoList;
    },
    replaceCurrentVideo(state, action) {
      state.currentVideo = action.payload.currentVideo;
    },
  },
});

export const videoActions = videoSlice.actions;

export default videoSlice.reducer;
