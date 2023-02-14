import VideoRoomComponent from "../components/openvidu/VideoRoomComponent";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configStore";
import { useAppSelector } from "../redux/configStore.hooks";
import { useState, useEffect } from "react";
import LoadingPage from "./LoadingPage";

function BroadcastPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const broadcast = useSelector((state: RootState) => state.broadcast);
  const user = useAppSelector((state) => state.user.userData);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2700);
  }, []);

  if (isLoading) return <LoadingPage />;
  return (
    <div>
      <VideoRoomComponent
        sessionName={broadcast.currentSession.sessionId}
        user={user}
      />
      {/* <VideoRoomComponent /> */}
    </div>
  );
}
// registerServiceWorker();
export default BroadcastPage;
