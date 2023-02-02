import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import Chip from "@mui/joy/Chip";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Favorite from "@mui/icons-material/Favorite";
import Visibility from "@mui/icons-material/Visibility";
import CreateNewFolder from "@mui/icons-material/CreateNewFolder";
import { autoBatchEnhancer } from "@reduxjs/toolkit";

export default function VideoCard() {
  return (
    <Card
      sx={{
        width: "100%",
        bgcolor: "initial",
        "--Card-padding": "0px",
      }}
    >
      <Box sx={{ position: "relative" }}>
        <AspectRatio ratio="9/5">
          <figure>
            <img
              src="https://i.ytimg.com/vi/0gY_z7fqPjs/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLB0w_6PP55kpL3H-VNAhtDIWuISAA"
              srcSet="https://images.unsplash.com/photo-1515825838458-f2a94b20105a?auto=format&fit=crop&w=300&dpr=2 2x"
              loading="lazy"
              alt="Yosemite by Casey Horner"
            />
          </figure>
        </AspectRatio>

        {/* 호버했을 때 표지에 보이는 요소 */}
        <CardCover
          className="gradient-cover"
          sx={{
            "&:hover, &:focus-within": {
              opacity: 1,
            },
            opacity: 0,
            transition: "0.1s ease-in",
            background:
              "linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)",
          }}
        >
          {/* The first box acts as a container that inherits style from the CardCover */}
          <Box>
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                flexGrow: 1,
                alignSelf: "flex-end",
              }}
            >
              <Typography level="h2" noWrap sx={{ fontSize: "lg" }}>
                <Link
                  href="#dribbble-shot"
                  overlay
                  underline="none"
                  sx={{
                    color: "#fff",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    display: "block",
                  }}
                >
                  Video Title
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardCover>
      </Box>
      <Box sx={{ display: "flex", gap: 1, mt: 1.5, alignItems: "center" }}>
        {/* 아바타 */}
        <Avatar
          src="https://image.news1.kr/system/photos/2022/8/2/5508700/article.jpg/dims/optimize"
          size="sm"
          sx={{ "--Avatar-size": "2rem" }}
        />
        <Box>
          {/* 유저 닉네임 */}
          <Typography sx={{ fontSize: "sm", fontWeight: "lg" }}>
            UserNickName
          </Typography>

          {/* 좋아요 표시 */}
          <Link
            href="#dribbble-shot"
            level="body3"
            underline="none"
            startDecorator={<Favorite sx={{ width: 20 }} />}
            color="neutral"
            sx={{
              fontSize: "sm",
              fontWeight: "md",
              ml: "auto",
              "&:hover": { color: "danger.plainColor" },
            }}
          >
            117
          </Link>

          {/* 조회수 표시 */}
          <Link
            href="#dribbble-shot"
            level="body3"
            underline="none"
            startDecorator={<Visibility sx={{ width: 20 }} />}
            color="neutral"
            sx={{
              fontSize: "sm",
              fontWeight: "md",
              ml: 2,
              "&:hover": { color: "primary.plainColor" },
            }}
          >
            10.4k
          </Link>
        </Box>

        {/* 라이브 표시 */}
        <Chip
          variant="outlined"
          color="neutral"
          size="sm"
          sx={{
            borderRadius: "sm",
            py: 0.25,
            px: 0.5,
            ml: "auto",
          }}
        >
          Live
        </Chip>
      </Box>
    </Card>
  );
}
