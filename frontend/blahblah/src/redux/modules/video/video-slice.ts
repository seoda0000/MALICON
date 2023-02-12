import { createSlice } from "@reduxjs/toolkit";
import { SessionType } from "../../../model/broadcast/sessionType";
import { VideoStateType } from "../../../model/video/VideoStateType";

const initialState: VideoStateType = {
  allVideoList: [],
  followingVideoList: [
    {
      id: 1,
      userPK: 33,
      userId: "seoda0000",
      nickName: "seoda0000",
      avatar:
        '{"body":["rounded"],"clothingColor":["000000"],"eyes":["happy"],"facialHair":["pyramid"],"facialHairProbability":100,"hair":["extraLong"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',
      title: "구독동영상제목1",
      views: 5435,
      pathUrl: "구독동영상경로여1",
      createDate: "2023-02-06T16:58:06.093775",
      hashtags:
        '[{"key":14,"label":"통기타","selected":true},{"key":16,"label":"밴드","selected":true}]',
      like: true,
      likeCnt: 3514,
      thumbnail:
        "https://i.ytimg.com/vi/0gY_z7fqPjs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB0w_6PP55kpL3H-VNAhtDIWuISAA",
      // comments: {
      //   content: [],
      // },
    },
    {
      id: 2,
      userPK: 23,
      userId: "ssafy12",
      nickName: "ssafy12",
      avatar:
        '{"body":["squared"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["beanie"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',
      title: "구독동영상제목2",
      views: 430,
      pathUrl: "동영상경로여",
      createDate: "2023-02-06T16:58:06.093775",
      hashtags: '[{"key":13,"label":"EDM","selected":true}]',
      like: true,
      likeCnt: 3514,
      thumbnail:
        "https://i.ytimg.com/vi/0gY_z7fqPjs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB0w_6PP55kpL3H-VNAhtDIWuISAA",
      // comments: {
      //   content: [],
      // },
    },
    {
      id: 3,
      userPK: 13,
      userId: "abcde",
      nickName: "abcde",
      avatar:
        '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',
      title: "구독동영상제목3",
      views: 658,
      pathUrl: "동영상경로여",
      createDate: "2023-02-06T16:58:06.093775",
      hashtags:
        '[{"key":18,"label":"팬미팅","selected":true},{"key":17,"label":"리코더","selected":true}]',
      like: true,
      likeCnt: 3514,
      thumbnail:
        "https://i.ytimg.com/vi/0gY_z7fqPjs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB0w_6PP55kpL3H-VNAhtDIWuISAA",
      // comments: {
      //   content: [],
      // },
    },
  ],
  currentVideo: {
    id: 2,
    userPK: 3,
    userId: "ssafy",
    nickName: "ssafy",
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',

    title: "동영상제목",
    views: 3,
    pathUrl: "동영상경로여",
    createDate: "2023-02-06T16:58:35.329186",
    hashtags:
      '[{"key":18,"label":"팬미팅","selected":true},{"key":17,"label":"리코더","selected":true}]',
    like: true,
    likeCnt: 1,
    thumbnail:
      "https://i.ytimg.com/vi/0gY_z7fqPjs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB0w_6PP55kpL3H-VNAhtDIWuISAA",
    comments: [
      {
        id: 13,
        content: "정말 멋진 동영상입니다",
        createDate: "2023-02-07T16:58:35.329186",
        lastModifiedDate: "2023-02-07T16:58:35.329186",
        videoId: 2,
        userPK: 3,
        userId: "commentor",
        avatar:
          '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',

        nickName: "덧글단사람",
      },
    ],
    // emotionLog: [
    //   {
    //     time: 2000,
    //     avatar: "test",
    //     type: "type",
    //     userId: "ssafy1",
    //   },
    //   {
    //     time: 3000,
    //     avatar: "test",
    //     type: "type",
    //     userId: "ssafy2",
    //   },
    //   {
    //     time: 4000,
    //     avatar: "test",
    //     type: "type",
    //     userId: "ssafy3",
    //   },
    //   {
    //     time: 5000,
    //     avatar: "test",
    //     type: "type",
    //     userId: "ssafy4",
    //   },
    // ],
  },
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    replaceAllVideos(state, action) {
      state.allVideoList = action.payload.allVideoList;
    },
    replaceCurrentVideo(state, action) {
      state.currentVideo = action.payload.currentVideo;
    },
  },
});

export const videoActions = videoSlice.actions;

export default videoSlice.reducer;
