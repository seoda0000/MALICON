import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInitializer } from "../../utils/axiosInitializer";

// 프로필 정보 가져오기
export const getProfileAction = createAsyncThunk(
  "GET_PROFILE",
  async (userId: string, { rejectWithValue }) => {
    try {
      console.log("비동기요청[GET_PROFILE] 시작");
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/profile/${userId}`);
      console.log("비동기요청[GET_PROFILE] 끝");
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

