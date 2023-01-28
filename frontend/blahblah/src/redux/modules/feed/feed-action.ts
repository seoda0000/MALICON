import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FeedType } from "../../../model/feed/feedType";
import { feedActions } from "./feed-slice";
import { AppDispatch } from "../../configStore";
import { useSelector, useDispatch } from "react-redux";
import { FeedPostType } from "../../../model/feed/feedPostType";

import { getAccessToken } from "../user/token";

function createDefaultAxiosInst() {
  let instance = axios.create({
    baseURL: "http://blahblah.movebxeax.me/web-service",
  });
  return instance;
}

// 피드 목록 가져오기
export const fetchFeedData = createAsyncThunk(
  "feed/fetchFeedData",
  async (_, thunkAPI) => {
    try {
      // const dispatch = useDispatch<AppDispatch>();
      const inst = createDefaultAxiosInst();

      console.log("액세스 토큰", getAccessToken());

      const response = await inst.get("/api/articles/subscribe", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Baerer " + getAccessToken(),
        },
      });

      const rawFeeds = response.data.content;

      const dateMaker = (lst: any) => {
        return (
          String(lst[0]) +
          "-" +
          String(lst[1]) +
          "-" +
          String(lst[2]) +
          " " +
          String(lst[3]) +
          ":" +
          String(lst[4])
        );
      };

      const feeds = rawFeeds.map((feed: any) => {
        return {
          id: feed.id,
          title: feed.title,
          content: feed.content,
          createDate: dateMaker(feed.createDate),
          lastModifiedDate: dateMaker(feed.lastModifiedDate),

          userId: feed.userEntity.userId,
          userAvatar: feed.userEntity.avatar,
          userNickName: feed.userEntity.nickName,
        };
      });

      console.log("피드목록: ", feeds);

      thunkAPI.dispatch(
        feedActions.replaceFeed({
          feeds: feeds,
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
  async (postData: FeedPostType, thunkAPI) => {
    try {
      const inst = createDefaultAxiosInst();

      await inst
        .post<FeedPostType>(`/api/articles`, postData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Baerer " + getAccessToken(),
          },
        })
        .then(({ data }: any) => {
          console.log("피드 작성: ", data);

          thunkAPI.dispatch(fetchFeedData());
        });

      // return data;
    } catch (e: any) {
      console.log("작성 실패");
      console.log(e.request);
      console.error(e.response.data);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 피드 삭제하기

export const removeFeedData = createAsyncThunk(
  "feed/removeFeedData",
  async (feedData: any, { rejectWithValue }) => {
    try {
      const inst = createDefaultAxiosInst();

      const { data } = await inst.post<FeedType>(`/api/articles`, feedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Baerer " + getAccessToken(),
        },
      });
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

      const { data } = await inst.put<FeedType>(`/api/articles`, postData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Baerer " + getAccessToken(),
        },
      });
      console.log("피드 작성: ", data);

      return data;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);
