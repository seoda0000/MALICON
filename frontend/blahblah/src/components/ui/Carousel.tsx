import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";
import {
  Avatar,
  CardHeader,
  css,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProfileImage from "../common/ProfileImage";
import { ProfileVideoType } from "../../model/profile/profileVideoType";
import VideoCard from "../video/VideoCard";
import { VideoType } from "../../model/video/VideoType";
import { VideoWrapType } from "../../model/profile/videoWrapType";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import { useParams } from "react-router-dom";
import EmptyMessage from "../common/EmptyMessage";

const CarouselContainer = styled.div<{ short: boolean }>`
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
  ${({ short }) =>
    short &&
    css`
      .slick-cloned {
        display: none;
      }
    `}
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
  centerPadding: "60px",
  arrows: true,
  pauseOnFocus: true,
  accessibility: true,
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
};

type CarouselPorpsType = {
  items?: VideoWrapType | VideoType[];
  actionFunc: any;
  setIsMoreVideoExist: any;
};

export default function Carousel({
  items,
  actionFunc,
  setIsMoreVideoExist,
}: CarouselPorpsType): JSX.Element {
  const { userpk } = useParams() as { userpk: string };
  const dispatch = useAppDispatch();
  const getVideo = useAppSelector((state) => state.profile.getVideo);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const onClickVideoMore = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const onCloseVideoMore = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (getVideo.data) {
      if (getVideo.data.content.length > 3) {
        setIsMoreVideoExist(true);
      } else {
        setIsMoreVideoExist(false);
      }
    }
  }, [getVideo]);

  useEffect(() => {
    dispatch(actionFunc({ userPK: userpk, size: 5, page: 0 }));
  }, []);
  return (
    <CarouselContainer
      short={
        getVideo.data && (getVideo.data as VideoWrapType).content.length < 3
      }
    >
      {getVideo.data ? (
        <Slider {...settings}>
          {(getVideo.data as VideoWrapType).content.map((item, idx) => (
            <CarouselItemBox key={item.id}>
              <VideoCard nth={idx} video={item} />
              <Menu
                anchorEl={anchorEl}
                id="more-menu"
                open={open}
                onClose={onCloseVideoMore}
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
      ) : (
        <EmptyMessage text="지난 영상이 없습니다" />
      )}
    </CarouselContainer>
  );
}

