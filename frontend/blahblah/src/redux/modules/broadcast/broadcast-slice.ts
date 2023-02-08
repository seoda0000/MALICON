import { createSlice } from "@reduxjs/toolkit";
import { SessionType } from "../../../model/broadcast/sessionType";
import { BroadcastStateType } from "../../../model/broadcast/broadcastStateType";

const initialState: BroadcastStateType = {
  sessions: [],

  // 비디오 창 열렸는지
  isViewed: false,

  // 현재 참여 세션
  currentSession: {
    sessionId: "",
    title: "",
    viewNumber: 0,
    startAt: "",
    thumbnail: "",
    streamer: { userId: "", nickName: "", avatar: "" },
    hashTag: "",
  },
};

const broadcastSlice = createSlice({
  name: "broadcast",
  initialState,
  reducers: {
    replaceSessions(state, action) {
      state.sessions = action.payload.sessions;
    },
    loadCurrentSession(state, action) {
      state.currentSession = action.payload.currentSession;
    },
    joinSession(state, action) {
      state.currentSession.sessionId = action.payload.sessionId;
    },
  },
});

export const broadcastActions = broadcastSlice.actions;

export default broadcastSlice.reducer;
