import VideoList from "../components/video/VideoList";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import AccountModal from "../components/auth/AccountModal";
import BroadcastList from "../components/broadcast/BroadcastList";
import { RootState } from "../redux/configStore";
import { AppDispatch } from "../redux/configStore";
import { fetchSessionData } from "../redux/modules/broadcast";
import LoadingPage from "./LoadingPage";
import BroadcastCarousel from "../components/broadcast/broadcastCarousel";

// 더미 데이터
const SAMPLE_SESSIONS = [
  {
    sessionId: "maria",
    title: "윈터 곱슬머리 무대",
    viewerNumber: 4352,
    startAt: "2023-02-04T18:54:10.175306",
    thumbnail: "https://i.ytimg.com/vi/qe0gepQh8N0/maxresdefault.jpg",
    streamer: {
      userId: "maria",
      nickName: "Guitar Master",
      avatar: "my avatar option made my json",
    },
  },
  {
    sessionId: "jackson",
    title: "윈터 하트",
    viewerNumber: 8762,
    startAt: "2023-02-04T18:54:19.678193",
    thumbnail: "https://i.ytimg.com/vi/UzbBohF8Ba0/maxresdefault.jpg",
    streamer: {
      userId: "jackson",
      nickName: "Guitar Master",
      avatar: "my avatar option made my json",
    },
  },
  {
    sessionId: "jackson1",
    title: "똑단발",
    viewerNumber: 12342,
    startAt: "2023-02-05T18:54:19.678193",
    thumbnail: "https://i.ytimg.com/vi/7qIuReWbE28/maxresdefault.jpg",
    streamer: {
      userId: "jackson1",
      nickName: "Guitar Master",
      avatar: "my avatar option made my json",
    },
  },
];

let isInitial = true;
function MainPage(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const broadcast = useSelector((state: RootState) => state.broadcast);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      dispatch(fetchSessionData());
      return;
    }
  }, [broadcast, dispatch]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2700);
  }, []);

  if (isLoading) return <LoadingPage />;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
      }}
    >
      <div>
        <BroadcastCarousel sessions={broadcast.sessions} />
        {/* <h1>예시</h1> */}
        {/* <BroadcastCarousel sessions={SAMPLE_SESSIONS} /> */}
        <h1>추천 동영상</h1>
        <VideoList />
      </div>
    </Box>
  );
}
export default MainPage;

