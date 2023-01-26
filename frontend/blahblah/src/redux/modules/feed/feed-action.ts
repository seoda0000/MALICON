import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FeedType } from "../../../model/feed/feedType";
import { feedActions } from "./feed-slice";
import { AppDispatch } from "../../configStore";
import { useSelector, useDispatch } from "react-redux";
import { getAccessToken } from "../user/token";
import { FeedPostType } from "../../../model/feed/feedPostType";

// 피드 목록 가져오기

export const fetchFeedData = createAsyncThunk(
  "feed/fetchFeedData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://blahblah.movebxeax.me/api/articles/subscribe`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
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
    } catch (e) {
      console.error(e);
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
      const { data } = await axios.post<FeedType>(
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

export const removeFeedData = () => {};

// 피드 수정하기

export const editFeedData = createAsyncThunk(
  "feed/postFeedData",
  async (postData: FeedPostType, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<FeedType>(
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
