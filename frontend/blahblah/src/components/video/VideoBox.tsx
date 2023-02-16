import VideoAvatarSection from "./VideoAvatarSection";
import VideoPlayer from "./VideoPlayer";
import { Box } from "@mui/system";
import { useState, useRef, useEffect } from "react";

const VideoBox: React.FC<{ emotionLog: any; pathUrl: any }> = (props) => {
  const [played, setPlayed] = useState(0);

  return (
    <Box sx={{ width: "100%", backgroundColor: "black" }}>
      {/* <h1 style={{ color: "white" }}>현재 재생 시점 : {played} sec</h1> */}
      <VideoPlayer
        played={played}
        setPlayed={setPlayed}
        pathUrl={props.pathUrl}
      />
      <VideoAvatarSection played={played} emotionLog={props.emotionLog} />
    </Box>
  );
};

export default VideoBox;
