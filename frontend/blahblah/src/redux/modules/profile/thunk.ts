import { ConstructionOutlined } from "@mui/icons-material";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FeedWrapType } from "../../../model/profile/feedWrapType";
import { ProfileFeedType } from "../../../model/profile/profileFeedType";
import { VideoWrapType } from "../../../model/profile/videoWrapType";
// import { ProfileFeedWrapType } from "../../../model/profile/ProfileFeedWrapType";
import { SubscriberType } from "../../../model/subscribe/subscriberType";
import { AboutMeType } from "../../../model/user/aboutMeType";
import {
  axiosInitializer,
  openviduInitializer,
} from "../../utils/axiosInitializer";
import { getAccessToken } from "../user/token";
import { getMeWithTokenAction } from "../user";
import { getSubscribersAction } from "../user";
// 프로필 정보 가져오기
export const getAboutMeAction = createAsyncThunk(
  "GET_ABOUTME",
  async (userPK: string, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/aboutme/${parseInt(userPK)}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAccessToken(),
        },
      });
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 방송중인지 확인
export const getIsOnAirAction = createAsyncThunk(
  "GET_ISONAIR",
  async (userId: string, { rejectWithValue }) => {
    try {
      const axios = openviduInitializer();
      // console.log("!!!!", userId);
      const { data } = await axios.get<boolean>(
        `api/sessions/onAir/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAccessToken(),
          },
        }
      );

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 자기소개 추가
export const addAboutMeAction = createAsyncThunk(
  "ADD_ABOUTME",
  async (aboutMeData: any, { dispatch, rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      await axios
        .post(`/api/aboutme`, aboutMeData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAccessToken(),
          },
        })
        .then(() => {
          dispatch(getAboutMeAction(String(aboutMeData.userPK)));
        });
      // return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 자기소개 수정
export const updateAboutMeAction = createAsyncThunk(
  "UPDATE_ABOUTME",
  async (aboutMeData: AboutMeType, { dispatch, rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      await axios
        .put(`/api/aboutme`, aboutMeData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Baerer " + getAccessToken(),
          },
        })
        .then(() => {
          dispatch(getAboutMeAction(String(aboutMeData.userPK)));
        });

      // console.log("자기소개 수정 완료");
      // return data;
    } catch (e) {
      // console.log("자기소개 수정 실패");
      // console.error(e);
      return rejectWithValue(e);
    }
  }
);

// 구독중인지
export const getIsSubscribeAction = createAsyncThunk(
  "GET_IS_SUB",
  async (_, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/subscribes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAccessToken(),
        },
      });

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 구독 추가
export const subscribeAction = createAsyncThunk(
  "SUBSCRIBE",
  async (userPK: string, { dispatch, rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const req = {
        userPK: parseInt(userPK),
      };
      const { data } = await axios.post(`/api/subscribes`, req, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAccessToken(),
        },
      });

      dispatch(getSubscribersAction());

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 구독 취소
export const unSubscribeAction = createAsyncThunk(
  "UNSUBSCRIBE",
  async (userPK: string, { dispatch, rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.delete(
        `/api/subscribes/${parseInt(userPK)}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAccessToken(),
          },
        }
      );
      dispatch(getSubscribersAction());
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 지난영상목록 가져오기
export type GetVideoActionPropsType = {
  userPK: string;
  size: number;
  page: number;
};
export const getVideoAction = createAsyncThunk(
  "GET_VIDEO",
  async (
    { userPK, size, page }: GetVideoActionPropsType,
    { rejectWithValue }
  ) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get<VideoWrapType>(
        `/api/videos/${parseInt(userPK)}/${size}/${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authroization: "Bearer " + getAccessToken(),
          },
        }
      );

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 피드 가져오기
export const getFeedAction = createAsyncThunk(
  "GET_FEED",
  async (
    { userPK, size, page }: GetVideoActionPropsType,
    { rejectWithValue }
  ) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get<FeedWrapType>(
        `/api/articles/${parseInt(userPK)}/${size}/${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAccessToken(),
          },
        }
      );

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
