import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserType } from "../../../model/user/userType";

// 회원가입
export const signupAction = createAsyncThunk(
  "SIGNUP",
  async (userData: UserType, { rejectWithValue }) => {
    try {
      console.log("비동기요청[SIGNUP] 시작 ");
      const { data } = await axios.post<UserType>(
        `http://localhost:8080/api/users`,
        userData
      );
      console.log("비동기요청 끝 : " + data);
      return data;
    } catch (e) {
      console.error(e);
      return rejectWithValue(e);
    }
  }
);

