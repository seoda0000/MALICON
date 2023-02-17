import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "../user/token";
import { openviduInitializer } from "../../utils/axiosInitializer";
import { SessionType } from "../../../model/broadcast/sessionType";
import { useSelector, useDispatch } from "react-redux";
import { broadcastActions } from "./broadcast-slice";
import { BroadcastStartType } from "../../../model/broadcast/broadcastStartType";

// 실시간 동영상 목록 가져오기
export const fetchSessionData = createAsyncThunk(
  "session/fetchSessionData",
  async (_, thunkAPI) => {
    try {
      // const dispatch = useDispatch<AppDispatch>();
      const axios = openviduInitializer();

      const response = await axios.get("/api/rooms", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Baerer " + getAccessToken(),
        },
      });

      const sessions = response.data;

      // console.log("세션목록: ", sessions);

      thunkAPI.dispatch(
        broadcastActions.replaceSessions({
          sessions: sessions,
        })
      );

      return response.data;
    } catch (e: any) {
      // console.error(e.response.data);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 방송 시작하기
export const startSession = createAsyncThunk(
  "broadcast/startSession",
  async (sessionData: BroadcastStartType, thunkAPI) => {
    try {
      const axios = openviduInitializer();

      await axios
        .post<BroadcastStartType>(`/api/sessions`, sessionData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Baerer " + getAccessToken(),
          },
        })
        .then(({ data }: any) => {
          // console.log("방송 시작: ", data);
          thunkAPI.dispatch(
            broadcastActions.loadCurrentSession({ currentSession: data })
          );

          // thunkAPI.dispatch(fetchSessionData());
        });

      // return data;
    } catch (e: any) {
      // console.log("dddddddddddddddddddd");
      // console.error(e);
      // console.log("dddddddddddddddddddd");
      return thunkAPI.rejectWithValue(e);
    }
  }
);
