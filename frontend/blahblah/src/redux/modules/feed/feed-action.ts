import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FeedType } from "../../../model/feed/feedType";

// 피드 목록 가져오기

export const fetchFeedData = createAsyncThunk(
  "feed/fetchFeedData",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<FeedType[]>(
        `http://localhost:8080/api/articles/subscribe`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      console.log("피드 리스트: ", response.data);
      return response.data;
    } catch (e) {
      console.error(e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 새 피드 작성하기

export const postFeedData = () => {};

// 피드 삭제하기

export const removeFeedData = () => {};

// 피드 수정하기

export const editFeedData = () => {};
