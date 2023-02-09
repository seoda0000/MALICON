import { useParams } from "react-router-dom";
import VideoSection from "../components/video/VideoSection";
import RightVideoSection from "../components/video/RightVideoSection";
import { Box } from "@mui/system";
import { RootState } from "../redux/configStore";
import { useSelector } from "react-redux";

const drawerWidth = 300;

export default function VideoPage() {
  const { videoId } = useParams();
  const video = useSelector((state: RootState) => state.video);
  const selectedvideo = video.allVideoList.filter(function (video) {
    return video.id === Number(videoId);
  })[0];

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <VideoSection video={selectedvideo} />
      </Box>
      <RightVideoSection drawerWidth={drawerWidth} />
    </Box>
  );
}
