import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessToken } from "../user/token";
import { openviduInitializer } from "../../utils/axiosInitializer";
import { SessionType } from "../../../model/broadcast/sessionType";
import { useSelector, useDispatch } from "react-redux";
