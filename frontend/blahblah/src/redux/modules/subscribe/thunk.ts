import { createAsyncThunk } from "@reduxjs/toolkit";
import { SubscriberType } from "../../../model/subscribe/subscriberType";
import { axiosInitializer } from "../../utils/axiosInitializer";
import { getAccessToken } from "../user/token";

// 구독자 가져오기
export const getSubscribersAction = createAsyncThunk(
  "GET_SUBSCRIBERS",
  async (_, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get<SubscriberType[]>(`/api/subscribe`, {
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

