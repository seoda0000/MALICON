import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import CardCover from "@mui/joy/CardCover";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import Visibility from "@mui/icons-material/Visibility";
import CreateNewFolder from "@mui/icons-material/CreateNewFolder";
import { autoBatchEnhancer } from "@reduxjs/toolkit";
import CardComp from "../common/CardComp";
import { ProfileVideoType } from "../../model/profile/profileVideoType";
import { VideoType } from "../../model/video/VideoType";

type VideoCardPropsType = {
  nth: number;
  video: ProfileVideoType | VideoType;
  setOpenLoginAlert?: any;
};

export default function VideoCard({
  nth,
  video,
  setOpenLoginAlert,
}: VideoCardPropsType): JSX.Element {
  let decodedImage;
  if (video.thumbnail) {
    decodedImage = decodeURIComponent(video.thumbnail);
    // const imageElement = document.createElement("img");
    // imageElement.src = `data:image/jpeg;base64,${decodedImage}`;
  }

  return (
    <CardComp
      nth={nth}
      title={video.title}
      setOpenLoginAlert={setOpenLoginAlert}
      caption={true}
      video={video}
    >
      <img
        src={
          video.thumbnail
            ? `data:image/jpeg;base64,${decodedImage}`
            : "https://i.ytimg.com/vi/0gY_z7fqPjs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB0w_6PP55kpL3H-VNAhtDIWuISAA"
        }
        // srcSet="https://images.unsplash.com/photo-1515825838458-f2a94b20105a?auto=format&fit=crop&w=300&dpr=2 2x"
        loading="lazy"
        alt={video.title}
        style={{ width: "100%" }}
      />
    </CardComp>
  );
}
