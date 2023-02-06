import { createSlice } from "@reduxjs/toolkit";
import { SessionType } from "../../../model/broadcast/sessionType";
import { BroadcastStateType } from "../../../model/broadcast/broadcastStateType";

const initialState: BroadcastStateType = {
  sessions: [],
  isViewed: false,
};

const broadcastSlice = createSlice({
  name: "broadcast",
  initialState,
  reducers: {
    replaceSessions(state, action) {
      state.sessions = action.payload.sessions;
    },
  },
});

export const broadcastActions = broadcastSlice.actions;

export default broadcastSlice.reducer;
