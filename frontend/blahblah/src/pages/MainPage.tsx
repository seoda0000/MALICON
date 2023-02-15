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
import ChipsArray from "../components/broadcast/ChipsArray";
interface ChipData {
  key: number;
  label: string;
  selected: boolean;
}

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

  // chips
  const [chipData, setChipData] = useState<ChipData[]>([
    { key: 0, label: "K-POP", selected: false },
    { key: 1, label: "발라드", selected: false },
    { key: 2, label: "락", selected: false },
    { key: 3, label: "트로트", selected: false },
    { key: 4, label: "디스코", selected: false },
    { key: 5, label: "팝", selected: false },
    { key: 6, label: "재즈", selected: false },
    { key: 7, label: "클래식", selected: false },
    { key: 8, label: "CCM", selected: false },
    { key: 9, label: "힙합", selected: false },
    { key: 10, label: "컨트리", selected: false },
    { key: 11, label: "레게", selected: false },
    { key: 12, label: "댄스", selected: false },
    { key: 13, label: "EDM", selected: false },
    { key: 14, label: "통기타", selected: false },
    { key: 15, label: "피아노", selected: false },
    { key: 16, label: "밴드", selected: false },
    { key: 17, label: "리코더", selected: false },
    { key: 18, label: "팬 미팅", selected: false },
    { key: 19, label: "인디", selected: false },
    { key: 20, label: "솔로", selected: false },
    { key: 21, label: "듀엣", selected: false },
    { key: 22, label: "그룹", selected: false },
  ]);

  const handleClick = (e: any) => {
    const target = e.target.innerHTML;
    setChipData((chips) =>
      chips.map((chip) => {
        if (chip.label === target) {
          chip.selected = !chip.selected;
        }
        return chip;
      })
    );
  };

  const chipList = chipData.filter((chip) => chip.selected === true);

  // 로딩 페이지 적용
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
        {/* <h1>추천 동영상</h1> */}
        <ChipsArray chipData={chipData} handleClick={handleClick} />
        <VideoList chipList={chipList} />
      </div>
    </Box>
  );
}
export default MainPage;
