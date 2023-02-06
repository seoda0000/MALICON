import VideoList from "../components/video/VideoList";
import { Box } from "@mui/system";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import AccountModal from "../components/auth/AccountModal";
import BroadcastList from "../components/broadcast/BroadcastList";
import { RootState } from "../redux/configStore";
import { AppDispatch } from "../redux/configStore";
import { fetchSessionData } from "../redux/modules/broadcast";
import BroadcastCarousel from "../components/broadcast/broadcastCarousel";

// 더미 데이터

// ==============================

let isInitial = true;

function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const broadcast = useSelector((state: RootState) => state.broadcast);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      // 절찬리 진행 이후 작업
      dispatch(fetchSessionData());
      return;
    }
  }, [broadcast, dispatch]);

  const [openModal, setOpenModal] = useState<boolean>(false);
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
        <h1>메인페이지</h1>
        <button onClick={() => setOpenModal((prev) => !prev)}>
          회원정보 수정
        </button>
        {openModal && <AccountModal open={openModal} setOpen={setOpenModal} />}

        <h1>지금 방영중인 실시간 동영상</h1>
        {/* <BroadcastList sessions={broadcast.sessions} /> */}
        <BroadcastCarousel sessions={broadcast.sessions} />
        <h1>추천 동영상</h1>
        <VideoList />
      </div>
    </Box>
  );
}
export default MainPage;
