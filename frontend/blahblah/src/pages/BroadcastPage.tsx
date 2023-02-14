import VideoRoomComponent from "../components/openvidu/VideoRoomComponent";
import { useSelector } from "react-redux";
import { RootState } from "../redux/configStore";
import { useAppSelector } from "../redux/configStore.hooks";

function BroadcastPage() {
  const broadcast = useSelector((state: RootState) => state.broadcast);
  const user = useAppSelector((state) => state.user.userData);

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

