import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "../user/token";
import { openviduInitializer } from "../../utils/axiosInitializer";
import { SessionType } from "../../../model/broadcast/sessionType";
import { useSelector, useDispatch } from "react-redux";
import { axiosInitializer } from "../../utils/axiosInitializer";
import { videoActions } from "./video-slice";
import { CommentPostType } from "../../../model/feed/commentPostType copy";

// 전체 비디오 목록 가져오기
export const fetchAllVideoData = createAsyncThunk(
  "video/fetchAllVideoData",
  async (_, thunkAPI) => {
    try {
      // const dispatch = useDispatch<AppDispatch>();
      const axios = axiosInitializer();

      const response = await axios.get("/api/videos/main/100/0", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Baerer " + getAccessToken(),
        },
      });

      const videos = response.data.content;
      const newVideos = videos.map((video: any) => {
        return {
          id: video.id,
          userPK: video.userPK,
          userId: video.userId,
          nickName: video.nickName,
          avatar: video.avatar,
          title: video.title,
          views: video.views,
          pathUrl: video.pathUrl,
          createDate: video.createDate,
          hashtags: video.hashtags,
          like: video.like,
          likeCnt: video.likeCnt,
          thumbnail: video.thumbnail,

          //   commentList: video.comments.content,
        };
      });
      console.log("저장된 비디오 목록", videos);
      thunkAPI.dispatch(
        videoActions.replaceAllVideos({
          allVideoList: newVideos,
        })
      );

      return response.data;
    } catch (e: any) {
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 특정 비디오 가져오기
export const getVideoById = createAsyncThunk(
  "video/getVideoById",
  async (videoId: number, thunkAPI) => {
    try {
      // const dispatch = useDispatch<AppDispatch>();
      const axios = axiosInitializer();

      const response = await axios.get(`/api/videos/details/${videoId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Baerer " + getAccessToken(),
        },
      });

      const video = response.data;
      console.log(video);
      const newVideo = {
        id: video.id,
        title: video.title,
        views: video.views,
        pathUrl: video.pathUrl,
        createDate: video.createDate,
        hashtags: video.hashtags,
        thumbnail: video.thumbnail,
        like: video.like,
        likeCnt: video.likeCnt,
        userPK: video.userPK,
        userId: video.userId,
        nickName: video.nickName,
        avatar: video.avatar,
        comments: video.comments.content,
      };

      thunkAPI.dispatch(
        videoActions.replaceCurrentVideo({
          currentVideo: newVideo,
        })
      );

      return response.data;
    } catch (e: any) {
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// // 새 피드 작성하기

// export const postFeedData = createAsyncThunk(
//   "feed/postFeedData",
//   async (postData: FeedPostType, thunkAPI) => {
//     try {
//       const axios = axiosInitializer();

//       await axios
//         .post<FeedPostType>(`/api/articles`, postData, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Baerer " + getAccessToken(),
//           },
//         })
//         .then(({ data }: any) => {
//           console.log("피드 작성: ", data);

//           thunkAPI.dispatch(fetchFeedData());
//         });

//       // return data;
//     } catch (e: any) {
//       console.log("작성 실패");
//       console.log(e.request);
//       console.error(e.response.data);
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );

// // 피드 삭제하기

// export const removeFeedData = createAsyncThunk(
//   "feed/removeFeedData",
//   async (removeData: any, thunkAPI) => {
//     try {
//       const axios = axiosInitializer();

//       const { data } = await axios.delete<FeedRemoveType>("/api/articles", {
//         data: removeData,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Baerer " + getAccessToken(),
//         },
//       });
//       console.log("피드 삭제: ", data);
//       thunkAPI.dispatch(fetchFeedData());

//       return data;
//     } catch (e) {
//       console.error(e);
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );

// // 피드 수정하기

// export const editFeedData = createAsyncThunk(
//   "feed/editFeedData",
//   async (editData: FeedEditType, thunkAPI) => {
//     try {
//       const axios = axiosInitializer();

//       await axios
//         .put<FeedEditType>(`/api/articles`, editData, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Baerer " + getAccessToken(),
//           },
//         })
//         .then(({ data }: any) => {
//           console.log("피드 수정: ", data);

//           thunkAPI.dispatch(fetchFeedData());
//         });

//       // return data;
//     } catch (e: any) {
//       console.log("수정 실패");
//       console.log(e.request);
//       console.error(e.response.data);
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );

// 덧글 작성

export const postVideoCommentData = createAsyncThunk(
  "feed/postVideoCommentData",
  async (postData: CommentPostType, thunkAPI) => {
    try {
      const axios = axiosInitializer();

      await axios
        .post<CommentPostType>(`/api/comments/videos`, postData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Baerer " + getAccessToken(),
          },
        })
        .then(({ data }: any) => {
          console.log("비디오 덧글 작성: ", data);

          thunkAPI.dispatch(getVideoById(postData.videoId!));

          console.log("피드 리스트 갱신 완료");
        });
    } catch (e: any) {
      console.log("비디오 덧글 작성 실패");
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 덧글 삭제하기

export const removeVideoCommentData = createAsyncThunk(
  "feed/removeVideoCommentData",
  async (removeData: any, thunkAPI) => {
    try {
      const axios = axiosInitializer();

      await axios
        .delete(`/api/comments/videos/${removeData.id}/${removeData.userPK}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Baerer " + getAccessToken(),
          },
        })
        .then((data) => {
          console.log("덧글 삭제: ", data);
          thunkAPI.dispatch(getVideoById(removeData.videoId));
        });
    } catch (e) {
      console.error(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 비디오 좋아요

export const likeVideoAction = createAsyncThunk(
  "feed/likeVideoAction",
  async (videoId: number, thunkAPI) => {
    try {
      const axios = axiosInitializer();

      await axios
        .post(
          `/api/likes/videos`,
          { videoId: videoId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Baerer " + getAccessToken(),
            },
          }
        )
        .then(({ data }: any) => {
          console.log("비디오 좋아요: ", data);

          thunkAPI.dispatch(getVideoById(videoId));

          console.log("비디오 리스트 갱신 완료");
        });
    } catch (e: any) {
      console.log("비디오 좋아요 실패");
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 피드 좋아요 취소

export const likeVideoCancelAction = createAsyncThunk(
  "video/likeVideoCancelAction",
  async (videoId: number, thunkAPI) => {
    try {
      const axios = axiosInitializer();

      await axios
        .delete(`/api/likes/videos/${videoId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Baerer " + getAccessToken(),
          },
        })
        .then(({ data }: any) => {
          console.log("비디오 좋아요 취소: ", data);

          thunkAPI.dispatch(getVideoById(videoId));

          console.log("비디오 리스트 갱신 완료");
        });
    } catch (e: any) {
      console.log("비디오 좋아요 치소 실패");
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e);
    }
  }
);
