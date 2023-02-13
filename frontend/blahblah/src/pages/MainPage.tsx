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
import { fetchAllVideoData } from "../redux/modules/video";
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
      dispatch(fetchAllVideoData());

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
