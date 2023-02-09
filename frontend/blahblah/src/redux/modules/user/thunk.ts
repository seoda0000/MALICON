import { createAsyncThunk } from "@reduxjs/toolkit";
import { SigninResponseType } from "../../../model/user/signinResponseType";
import { SigninType } from "../../../model/user/signinType";
import { SignupType } from "../../../model/user/signupType";
import { UserType } from "../../../model/user/userType";
import { UpdateUserType } from "../../../model/user/updateUserType";
import { useAppDispatch } from "../../configStore.hooks";
import {
  getAccessToken,
  getRefreshToken,
  removeToken,
  setAccessToken,
  setRefreshToken,
} from "./token";
import {
  axiosInitializer,
  openviduInitializer,
} from "../../utils/axiosInitializer";
import { AboutMeType } from "../../../model/user/aboutMeType";
import { UserUpdateType } from "../../../model/user/userUpdateType";
import { SubscriberType } from "../../../model/subscribe/subscriberType";

// 회원가입
export const signupAction = createAsyncThunk(
  "SIGNUP",
  async (userData: SignupType, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.post(`/api/users`, userData);
      alert("회원가입 완료");
      return data;
    } catch (e: any) {
      alert(e.response.data.message);
      return rejectWithValue(e);
    }
  }
);

// 아이디 중복 확인
export const checkDuplicateAction = createAsyncThunk(
  "CHECK_DUPLICATE",
  async (userId: string, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/users/${userId}`);

      return data;
    } catch (e) {
      console.log("이미 사용중인 아이디!!");
      return rejectWithValue(e);
    }
  }
);

// 닉네임 중복 확인
export const checkDupNickNameAction = createAsyncThunk(
  "CHECK_DUP_NICKNAME",
  async (nickName: string, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get(`/api/users/nickname/${nickName}`);

      return data;
    } catch (e) {
      console.log("이미 사용중인 닉네임!!");
      return rejectWithValue(e);
    }
  }
);

// 로그인
export const signinAction = createAsyncThunk(
  "SIGNIN",
  async (userData: SigninType, { dispatch, rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      await axios
        .post("/api/auth/login", userData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(({ data }: any) => {
          // 로컬스토리지 저장
          setAccessToken(data.token.accessToken);
          setRefreshToken(data.token.refreshToken);
        })
        .then(() => {
          // user state에 저장
          dispatch(getMeWithTokenAction());
        });

      // return data;
    } catch (e: any) {
      alert(e.response.data.message);
      return rejectWithValue(e);
    }
  }
);

// 로그인한 정보 state에 저장
export const getMeWithTokenAction = createAsyncThunk(
  "GET_ME",
  async (token, { dispatch, rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get("/api/users/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Baerer " + getAccessToken(),
        },
      });
      console.log(`로그인 - User: ${data.userId}`);

      return data;
    } catch (e) {
      // 토큰 갱신
      dispatch(refreshTokenAction());

      return rejectWithValue(e);
    }
  }
);

export const refreshTokenAction = createAsyncThunk(
  "REFRESH_TOKEN",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      console.log("비동기요청[REFRESH_TOKEN] 시작");
      const req = { reqRefreshToken: getRefreshToken() };

      const axios = axiosInitializer();
      await axios
        .post("/api/auth/refresh", req)
        .then(({ data }) => {
          console.log("비동기요청[REFRESH_TOKEN] 끝 : " + data.message);

          setAccessToken(data.token.accessToken);
          setRefreshToken(data.token.refreshToken);
        })
        .then(() => {
          // user state에 저장
          dispatch(getMeWithTokenAction());
        });

      // return data;
    } catch (e) {
      // 로그아웃
      removeToken();
      console.log("로그아웃");

      return rejectWithValue(e);
    }
  }
);

// 회원정보 수정
export const updateUserAction = createAsyncThunk(
  "UPDATE_USER",
  async (userData: UserUpdateType, { dispatch, rejectWithValue }) => {
    try {
      const axios = axiosInitializer();

      console.log(userData);

      await axios
        .put(`/api/users`, userData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Baerer " + getAccessToken(),
          },
        })
        .then(() => {
          dispatch(getMeWithTokenAction());
        });
      // return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 회원정보 삭제
export const deleteUserAction = createAsyncThunk(
  "DELETE_USER",
  async (_, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      await axios
        .delete(`/api/users`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Baerer " + getAccessToken(),
          },
        })
        .then(() => {
          removeToken();
        });
      // return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 구독자 가져오기
export const getSubscribersAction = createAsyncThunk(
  "GET_SUBSCRIBERS",
  async (_, { rejectWithValue }) => {
    try {
      const axios = axiosInitializer();
      const { data } = await axios.get<SubscriberType[]>(`/api/subscribes`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getAccessToken(),
        },
      });

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

// 방송중인지 확인
export const getIsOnAirAction = createAsyncThunk(
  "GET_ISONAIR",
  async (userId: string, { rejectWithValue }) => {
    try {
      const axios = openviduInitializer();
      const { data } = await axios.get<boolean>(
        `api/sessions/onAir/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + getAccessToken(),
          },
        }
      );

      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

