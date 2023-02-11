import VideoAvatarSection from "./VideoAvatarSection";
import VideoPlayer from "./VideoPlayer";
import { Box } from "@mui/system";

const VideoBox: React.FC<{ emotionLog: any }> = (props) => {
  return (
    <Box sx={{ width: "100%", backgroundColor: "black" }}>
      <VideoPlayer />
      <VideoAvatarSection emotionLog={props.emotionLog} />
    </Box>
  );
};

export default VideoBox;
