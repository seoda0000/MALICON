import VideoRoomComponent from "../components/openvidu/VideoRoomComponent";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configStore";
import { useAppSelector } from "../redux/configStore.hooks";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

function BroadcastPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const broadcast = useSelector((state: RootState) => state.broadcast);
  const user = useAppSelector((state) => state.user.userData);
  const isLoggedIn = useAppSelector((state) => state.user.userData.isLoggedIn)
  const navigate = useNavigate();

  useEffect(() => {
    if(!isLoggedIn) {
      alert("로그인 되지 않은 사용자입니다. 메인페이지로 돌아갑니다.");
      navigate("/main");
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2700);
  }, []);
  if (isLoading) return <LoadingPage />;
  return (
    <div>
      <VideoRoomComponent
        currentSession={broadcast.currentSession}
        user={user}
      />
      {/* <VideoRoomComponent /> */}
    </div>
  );
}
// registerServiceWorker();
export default BroadcastPage;
