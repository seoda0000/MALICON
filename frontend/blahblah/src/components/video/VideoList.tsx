import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import VideoCard from "./VideoCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function VideoList() {
  return (
    <Grid
      container
      // justifyContent={"center"}
      // justifyItems={"center"}
      // alignItems={"center"}
      columnSpacing={{ xs: 2, md: 5 }}
      rowSpacing={{ xs: 2, md: 5 }}
      // columns={{ xs: 4, sm: 4, md: 12 }}
      // mx={{ xs: 0, md: 3 }}
    >
      {Array.from(Array(6)).map((_, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={index}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <VideoCard />
        </Grid>
      ))}
    </Grid>
  );
}
