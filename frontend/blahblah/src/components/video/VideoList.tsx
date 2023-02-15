import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import VideoCard from "./VideoCard";
import { ProfileVideoType } from "../../model/profile/profileVideoType";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/configStore";

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
  return (
    <Grid
      container
      columnSpacing={{ xs: 2, md: 5 }}
      rowSpacing={{ xs: 2, md: 5 }}
    >
      {video.allVideoList.map((video, index) => (
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
      ))}
    </Grid>
  );
};

export default VideoList;
