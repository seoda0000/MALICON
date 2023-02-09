import { createSlice } from "@reduxjs/toolkit";
import { SessionType } from "../../../model/broadcast/sessionType";
import { VideoStateType } from "../../../model/video/VideoStateType";

const initialState: VideoStateType = {
  allVideoList: [
    {
      id: 1,
      userPK: 33,
      userId: "seoda0000",
      nickName: "seoda0000",
      avatar: null,
      title: "동영상제목1",
      views: 1000,
      pathUrl: "동영상경로여1",
      createDate: "2023-02-06T16:58:06.093775",
      hashtags: "해시태그다잉",
      // comments: {
      //   content: [],
      // },
    },
    {
      id: 2,
      userPK: 23,
      userId: "ssafy12",
      nickName: "ssafy12",
      avatar: null,
      title: "동영상제목2",
      views: 340,
      pathUrl: "동영상경로여2",
      createDate: "2023-02-06T16:58:06.093775",
      hashtags: "해시태그다잉",
      // comments: {
      //   content: [],
      // },
    },
    {
      id: 3,
      userPK: 13,
      userId: "abcde",
      nickName: "abcde",
      avatar: null,
      title: "동영상제목3",
      views: 232402,
      pathUrl: "동영상경로여3",
      createDate: "2023-02-06T16:58:06.093775",
      hashtags: "해시태그다잉",
      // comments: {
      //   content: [],
      // },
    },
  ],
  followingVideoList: [
    {
      id: 1,
      userPK: 33,
      userId: "seoda0000",
      nickName: "seoda0000",
      avatar: null,
      title: "구독동영상제목1",
      views: 5435,
      pathUrl: "구독동영상경로여1",
      createDate: "2023-02-06T16:58:06.093775",
      hashtags: "해시태그다잉",
      // comments: {
      //   content: [],
      // },
    },
    {
      id: 2,
      userPK: 23,
      userId: "ssafy12",
      nickName: "ssafy12",
      avatar: null,
      title: "구독동영상제목2",
      views: 430,
      pathUrl: "동영상경로여",
      createDate: "2023-02-06T16:58:06.093775",
      hashtags: "해시태그다잉",
      // comments: {
      //   content: [],
      // },
    },
    {
      id: 3,
      userPK: 13,
      userId: "abcde",
      nickName: "abcde",
      avatar: null,
      title: "구독동영상제목3",
      views: 658,
      pathUrl: "동영상경로여",
      createDate: "2023-02-06T16:58:06.093775",
      hashtags: "해시태그다잉",
      // comments: {
      //   content: [],
      // },
    },
  ],
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    replaceAllVideos(state, action) {
      state.allVideoList = action.payload.allVideoList;
    },
  },
});

export const videoActions = videoSlice.actions;

export default videoSlice.reducer;
