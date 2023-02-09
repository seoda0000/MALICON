import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import VideoCard from "./VideoCard";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/configStore";

const RightVideoSection: React.FC<{ drawerWidth: number }> = (props) => {
  const video = useSelector((state: RootState) => state.video);

  return (
    <Box sx={{ width: { md: props.drawerWidth }, flexShrink: { sm: 0 } }}>
      <Paper
        // variant="permanent"
        sx={{
          display: { xs: "none", md: "flex" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: props.drawerWidth,
          },
          ml: 5,
          p: 2,
        }}
      >
        {/* 컨텐츠 내용 */}
        <Grid container rowSpacing={3}>
          <h3>Latest Video</h3>
          {video.followingVideoList.map((video, index) => (
            <Grid item width={"100%"} key={index}>
              <VideoCard nth={3} video={video} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default RightVideoSection;
