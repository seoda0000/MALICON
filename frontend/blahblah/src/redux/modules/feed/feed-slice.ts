import { createSlice } from "@reduxjs/toolkit";
import { FeedStateType } from "../../../model/feed/feedStateType";

const initialState: FeedStateType = {
  feeds: [],
  changed: false,
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {},
});

export const feedActions = feedSlice.actions;

export default feedSlice.reducer;
