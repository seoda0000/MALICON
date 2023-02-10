import VideoAvatarSection from "./VideoAvatarSection";
import VideoPlayer from "./VideoPlayer";
import { Box } from "@mui/system";
export default function VideoBox() {
  return (
    <Box sx={{ width: "100%", backgroundColor: "black" }}>
      <VideoPlayer />
      <VideoAvatarSection />
    </Box>
  );
}
