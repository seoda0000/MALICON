import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import { Avatar, CardHeader, IconButton, Menu, MenuItem } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProfileImage from "../common/ProfileImage";
import { VideoType } from "../../model/profile/VideoType";
import VideoCard from "../video/VideoCard";

const CarouselContainer = styled.div`
  .slick-slider {
    width: 90%;
    margin: 0 auto;
    & > button.slick-prev {
    }
    & > button.slick-next {
    }
    & > .slick-list {
      & > .slick-track {
        & > .slick-slide {
          & > div {
            margin: 0px 2px;
          }
          /* width: calc((85vw - 120px) / 3);
          height: calc((85vw vw - 120px) / 3 / 16 * 9); */
        }
      }
    }
  }
  .slick-prev,
  .slick-next {
  }
  .slick-prev:before,
  .slick-next:before {
    color: black;
  }
`;

const CarouselItemBox = styled.div`
  & > div.img-box {
    position: relative;
    /* width: calc((85vw - 120px) / 3); */
    height: calc((85vw vw - 120px) / 3 / 16 * 9);
    border-radius: 10px;
    & > img {
      border-radius: 10px;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  & > .MuiCardHeader-root {
    height: 50px;
  }
`;

const ItemDetailBox = styled.div`
  position: absolute;
  z-index: 500;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(3px);
  border-radius: 10px;
  color: white;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity ease-in 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  &: hover {
    opacity: 1;
  }
  & > p {
    margin: 0px 20px;
    text-align: center;
  }
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
`;

const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  centerPadding: "60px",
  slidesToShow: 3,
  speed: 500,
  arrows: true,
  pauseOnFocus: true,
  dots: true,
  accessibility: true,
};

type CarouselPorpsType = {
  items: VideoType[];
};

const mockupData = [
  {
    id: 1,
    title: "다 연주해드려요",
    thumbNail:
      "https://file2.nocutnews.co.kr/newsroom/image/2019/04/06/20190406105500385368_0_710_400.jpg",
    userId: "ssafy",
    hit: 15,
  },
  {
    id: 2,
    title: "다 불러드려요",
    thumbNail:
      "https://cdn.mediaus.co.kr/news/photo/201509/50280_121065_140.jpg",
    userId: "ssafy",
    hit: 13,
  },
  {
    id: 3,
    title: "다 어쩌구",
    thumbNail:
      "https://file2.nocutnews.co.kr/newsroom/image/2019/04/06/20190406105500385368_0_710_400.jpg",
    userId: "ssafy",
    hit: 21,
  },
  {
    id: 4,
    title: "한곡만 불러드려요",
    thumbNail:
      "https://cdn.mediaus.co.kr/news/photo/201509/50280_121065_140.jpg",
    userId: "ssafy",
    hit: 31,
  },
  {
    id: 5,
    title: "한곡만 연주해요",
    thumbNail:
      "http://t1.daumcdn.net/tvpot/thumb/sf8760CvvxBdCTBdoJKxRKz/thumb.png",
    userId: "ssafy",
    hit: 28,
  },
  {
    id: 6,
    title: "연습할거에요",
    thumbNail:
      "https://file2.nocutnews.co.kr/newsroom/image/2019/04/06/20190406105500385368_0_710_400.jpg",
    userId: "ssafy",
    hit: 38,
  },
  {
    id: 7,
    title: "오오오 그냥켰어요",
    thumbNail:
      "http://t1.daumcdn.net/tvpot/thumb/sf8760CvvxBdCTBdoJKxRKz/thumb.png",
    userId: "ssafy",
    hit: 40,
  },
  {
    id: 8,
    title: "메렁",
    thumbNail:
      "https://cdn.mediaus.co.kr/news/photo/201509/50280_121065_140.jpg",
    userId: "ssafy",
    hit: 33,
  },
  {
    id: 9,
    title: "연주연주",
    thumbNail:
      "https://file2.nocutnews.co.kr/newsroom/image/2019/04/06/20190406105500385368_0_710_400.jpg",
    userId: "ssafy",
    hit: 43,
  },
];

export default function Carousel({ items }: CarouselPorpsType): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const onClickVideoMore = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onCloseVideoMore = () => {
    setAnchorEl(null);
  };
  return (
    <CarouselContainer>
      <Slider {...settings}>
        {mockupData.map((item, idx) => (
          <CarouselItemBox key={item.id}>
            {/* <VideoCard nth={idx} video={item} /> */}
            {/* <div className="img-box">
              <img src={item.thumbNail} alt="" />
              <ItemDetailBox>
                <p> 간단한 소개글 블라블라 is a perfect party dish</p>
                <span>
                  <FavoriteIcon /> 조회수 {item.hit}k
                </span>
              </ItemDetailBox>
            </div>
            <CardHeader
              avatar={<ProfileImage />}
              action={
                <IconButton
                  aria-label="video-more"
                  onClick={onClickVideoMore}
                  aria-controls={open ? "more-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <MoreVertIcon />
                </IconButton>
              }
              title={item.title}
              subheader="2023. 01. 28"
            /> */}

            <Menu
              anchorEl={anchorEl}
              id="more-menu"
              open={open}
              onClose={onCloseVideoMore}
              // onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 0px 3px rgba(0,0,0,0.02))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={onCloseVideoMore}>
                <ShareIcon /> Share
              </MenuItem>
            </Menu>
          </CarouselItemBox>
        ))}
      </Slider>
    </CarouselContainer>
  );
}

