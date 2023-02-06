import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "../user/token";
import { openviduInitializer } from "../../utils/axiosInitializer";
import { SessionType } from "../../../model/broadcast/sessionType";
import { useSelector, useDispatch } from "react-redux";
import { broadcastActions } from "./broadcast-slice";
import { BroadcastStartType } from "../../../model/broadcast/broadcastStartType";

// 실시간 동영상 목록 가져오기
export const fetchSessionData = createAsyncThunk(
  "session/fetchSessionData",
  async (_, thunkAPI) => {
    try {
      // const dispatch = useDispatch<AppDispatch>();
      const axios = openviduInitializer();

      console.log("액세스 토큰", getAccessToken());

      const response = await axios.get("/api/rooms", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Baerer " + getAccessToken(),
        },
      });

      const sessions = response.data;

      console.log("세션목록: ", sessions);

      thunkAPI.dispatch(
        broadcastActions.replaceSessions({
          sessions: sessions,
        })
      );

      return response.data;
    } catch (e: any) {
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 방송 시작하기

export const startSession = createAsyncThunk(
  "broadcast/startSession",
  async (sessionData: BroadcastStartType, thunkAPI) => {
    try {
      const axios = openviduInitializer();

      await axios
        .post<BroadcastStartType>(`/api/sessions`, sessionData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Baerer " + getAccessToken(),
          },
        })
        .then(({ data }: any) => {
          console.log("방송 시작: ", data);

          thunkAPI.dispatch(fetchSessionData());
        });

      // return data;
    } catch (e: any) {
      console.log("dddddddddddddddddddd");
      console.error(e);
      console.log("dddddddddddddddddddd");
      return thunkAPI.rejectWithValue(e);
    }
  }
);

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

// // 덧글 작성

// export const postCommentData = createAsyncThunk(
//   "feed/postCommentData",
//   async (postData: CommentPostType, thunkAPI) => {
//     try {
//       const axios = axiosInitializer();

//       await axios
//         .post<CommentPostType>(`/api/comments`, postData, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Baerer " + getAccessToken(),
//           },
//         })
//         .then(({ data }: any) => {
//           console.log("덧글 작성: ", data);

//           thunkAPI.dispatch(fetchFeedData());

//           console.log("피드 리스트 갱신 완료");
//         });
//     } catch (e: any) {
//       console.log("덧글 작성 실패");
//       console.error(e.response.data);
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );

// // 덧글 삭제하기

// export const removeCommentData = createAsyncThunk(
//   "feed/removeCommentData",
//   async (removeData: any, thunkAPI) => {
//     try {
//       const axios = axiosInitializer();

//       await axios
//         .delete<FeedRemoveType>("/api/comments", {
//           data: removeData,
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: "Baerer " + getAccessToken(),
//           },
//         })
//         .then((data) => {
//           console.log("덧글 삭제: ", data);
//           thunkAPI.dispatch(fetchFeedData());
//         });
//     } catch (e) {
//       console.error(e);
//       return thunkAPI.rejectWithValue(e);
//     }
//   }
// );
