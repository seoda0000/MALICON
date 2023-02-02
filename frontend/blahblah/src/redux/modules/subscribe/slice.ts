import { createSlice } from "@reduxjs/toolkit";
import { SubscribeStateType } from "../../../model/subscribe/subscribeStateType";
import {} from "../profile";
import { getSubscribersAction } from "./thunk";

const initialState: SubscribeStateType = {
  subscribers: [],
  getSub: { loading: false, data: null, error: null },
};

const subscribeSlice = createSlice({
  name: "subscribe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubscribersAction.pending, (state) => {
        state.getSub.loading = true;
        state.getSub.data = null;
        state.getSub.error = null;
      })
      .addCase(getSubscribersAction.fulfilled, (state, { payload }) => {
        state.getSub.loading = false;
        state.getSub.data = payload;
        state.getSub.error = null;

        state.subscribers = payload;
      })
      .addCase(getSubscribersAction.rejected, (state, { payload }) => {
        state.getSub.loading = false;
        state.getSub.data = null;
        state.getSub.error = payload;
      });
  },
});

export default subscribeSlice.reducer;

