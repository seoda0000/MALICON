import { createSlice } from "@reduxjs/toolkit";
import { FeedStateType } from "../../../model/feed/feedStateType";
import { getFeedsAction } from "./feed-action";

const initialState: FeedStateType = {
  feeds: [],
  changed: false,
  feedData: null,
  getFeed: { loading: false, data: null, error: null },
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
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsAction.pending, (state) => {
        state.getFeed.loading = true;
        state.getFeed.data = null;
        state.getFeed.error = null;
      })
      .addCase(getFeedsAction.fulfilled, (state, { payload }) => {
        state.getFeed.loading = false;
        state.getFeed.data = payload;
        state.getFeed.error = null;

        state.feedData = payload;
      })
      .addCase(getFeedsAction.rejected, (state, { payload }) => {
        state.getFeed.loading = false;
        state.getFeed.data = null;
        state.getFeed.error = payload;
      });
  },
});

export const feedActions = feedSlice.actions;

export default feedSlice.reducer;

