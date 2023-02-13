import VideoRoomComponent from "../components/openvidu/VideoRoomComponent";
import registerServiceWorker from "../registerServiceWorker";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/configStore";
import { RootState } from "../redux/configStore";
import { useState } from "react";
import { useAppSelector } from "../redux/configStore.hooks";

function BroadcastPage() {
  const dispatch = useDispatch<AppDispatch>();
  const broadcast = useSelector((state: RootState) => state.broadcast);

  return (
    <div>
      <VideoRoomComponent sessionName={broadcast.currentSession.sessionId} user={useAppSelector((state) => state.user.userData)} />
      {/* <VideoRoomComponent /> */}
    </div>
  );
}
// registerServiceWorker();
export default BroadcastPage;
