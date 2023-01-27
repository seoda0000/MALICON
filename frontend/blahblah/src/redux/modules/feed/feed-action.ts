import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FeedType } from "../../../model/feed/feedType";
import { feedActions } from "./feed-slice";
import { AppDispatch } from "../../configStore";
import { useSelector, useDispatch } from "react-redux";
import { FeedPostType } from "../../../model/feed/feedPostType";

import { getAccessToken } from "../user/token";

// 피드 목록 가져오기

function createDefaultAxiosInst() {
  let instance = axios.create({
    baseURL: "http://blahblah.movebxeax.me/web-service",
  });
  return instance;
}

export const fetchFeedData = createAsyncThunk(
  "feed/fetchFeedData",
  async (_, thunkAPI) => {
    try {
      const inst = createDefaultAxiosInst();

      const response = await inst.get(
        `http://blahblah.movebxeax.me/web-service/api/articles/subscribe`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Baerer " + getAccessToken(),
          },
        }
      );
      console.log("피드 리스트: ", response.data);
      const dispatch = useDispatch<AppDispatch>();

      dispatch(
        feedActions.replaceFeed({
          feeds: response.data || [],
        })
      );

      return response.data;
    } catch (e: any) {
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 새 피드 작성하기

export const postFeedData = createAsyncThunk(
  "feed/postFeedData",
  async (postData: FeedPostType, { rejectWithValue }) => {
    // 새 피드 작성하기

    try {
      const inst = createDefaultAxiosInst();

      const { data } = await inst.post<FeedType>(
        `http://blahblah.movebxeax.me/api/articles`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      console.log("피드 작성: ", data);

      return data;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

// 피드 삭제하기

export const removeFeedData = createAsyncThunk(
  "feed/removeFeedData",
  async (feedData: any, { rejectWithValue }) => {
    try {
      const inst = createDefaultAxiosInst();

      const { data } = await inst.post<FeedType>(
        `http://blahblah.movebxeax.me/api/articles`,
        feedData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      console.log("피드 삭제: ", data);

      return data;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

// 피드 수정하기

export const editFeedData = createAsyncThunk(
  "feed/editFeedData",
  async (postData: FeedPostType, { rejectWithValue }) => {
    try {
      const inst = createDefaultAxiosInst();

      const { data } = await inst.post<FeedType>(
        `http://blahblah.movebxeax.me/api/articles`,
        postData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      console.log("피드 작성: ", data);

      return data;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);
