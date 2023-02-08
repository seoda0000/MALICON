import VideoRoomComponent from "../components/openvidu/VideoRoomComponent";
import registerServiceWorker from "../registerServiceWorker";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/configStore";
import { RootState } from "../redux/configStore";

function BroadcastPage() {
  const dispatch = useDispatch<AppDispatch>();
  const broadcast = useSelector((state: RootState) => state.broadcast);

  return (
    <div>
      <VideoRoomComponent sessionName={broadcast.currentSession.sessionId} />
      {/* <VideoRoomComponent /> */}
    </div>
  );
}
// registerServiceWorker();
export default BroadcastPage;
