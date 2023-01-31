import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInitializer } from "../../utils/axiosInitializer";
import { getAccessToken } from "../user/token";

// 프로필 정보 가져오기
export const getAboutMeAction = createAsyncThunk(
  "GET_ABOUTME",
  async (userPK: string, { rejectWithValue }) => {
    try {
      console.log("비동기요청[GET_ABOUTME] 시작");
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/aboutme/${parseInt(userPK)}`);
      console.log("비동기요청[GET_ABOUTME] 끝");
      return data;
    } catch (e) {
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
      const { data } = await axios.get(`/api/subscribe`, {
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
  async (userPK: string, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.post(`/api/subscribe/${parseInt(userPK)}`, {
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

// 구독 취소
export const unSubscribeAction = createAsyncThunk(
  "UNSUBSCRIBE",
  async (userPK: string, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.delete(
        `/api/subscribe/${parseInt(userPK)}`,
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

