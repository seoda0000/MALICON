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

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <VideoSection videoId={Number(videoId)} />
      </Box>
      <RightVideoSection drawerWidth={drawerWidth} />
    </Box>
  );
}
