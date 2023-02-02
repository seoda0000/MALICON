import VideoList from "../components/video/VideoList";
import { Box } from "@mui/system";
function MainPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // minHeight: "100vh",
      }}
    >
      <div>
        <h1>메인페이지</h1>
        <VideoList />
      </div>
    </Box>
  );
}
export default MainPage;
