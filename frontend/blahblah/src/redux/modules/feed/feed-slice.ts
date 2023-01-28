import { createSlice } from "@reduxjs/toolkit";
import { FeedStateType } from "../../../model/feed/feedStateType";

const initialState: FeedStateType = {
  feeds: [],
  changed: false,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    replaceFeed(state, action) {
      // console.log("디스패치 시작");
      state.feeds = action.payload.feeds;
    },
  },
});

export const feedActions = feedSlice.actions;

export default feedSlice.reducer;
