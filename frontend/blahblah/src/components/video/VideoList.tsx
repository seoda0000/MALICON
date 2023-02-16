import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import VideoCard from "./VideoCard";
import { ProfileVideoType } from "../../model/profile/profileVideoType";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configStore";
import PodcastsIcon from "@mui/icons-material/Podcasts";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const VideoList: React.FC<{ chipList?: any }> = (props) => {
  const video = useSelector((state: RootState) => state.video);
  console.log("해시태그 선택", props.chipList);
  console.log(video.allVideoList);
  return (
    <Grid
      container
      columnSpacing={{ xs: 2, md: 5 }}
      rowSpacing={{ xs: 2, md: 5 }}
    >
      {video.allVideoList.length ? (
        video.allVideoList.map((video, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <VideoCard nth={index} video={video} />
          </Grid>
        ))
      ) : (
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          display="flex"
          flexDirection="column"
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
          my={5}
          height="400px"
        >
          <PodcastsIcon color="disabled" />
          <p style={{ textAlign: "center", marginBottom: 0, color: "grey" }}>
            아직 비디오가 없습니다.
          </p>
          <p style={{ textAlign: "center", color: "grey" }}>
            지금 방송을 시작해서 첫번째 아티스트가 되어 보세요!
          </p>
        </Grid>
      )}
    </Grid>
  );
};

export default VideoList;
