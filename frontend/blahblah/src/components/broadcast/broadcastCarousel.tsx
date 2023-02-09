// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
// import "swiper/css/effect-cards";
import "swiper/css/effect-cards";
import { EffectCards, Navigation, Pagination } from "swiper";
import { Grid } from "@mui/material";
import BroadcastCarouselItem from "./broadcastCarouselItem";
// Import Swiper styles
import CarouselComp from "../common/CarouselComp";
import { SessionType } from "../../model/broadcast/sessionType";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { broadcastActions } from "../../redux/modules/broadcast/broadcast-slice";
import CardComp from "../common/CardComp";
import CarouselCompBasic from "../common/CarouselCompBasic";

const basicCarousel = require("../../assets/img/carousel_basic.png");

const basicList = [basicCarousel, basicCarousel, basicCarousel];

const BroadcastCarousel: React.FC<{ sessions: SessionType[] }> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const joinSessionStart = async () => {
    dispatch(
      broadcastActions.joinSession({
        sessionId: props.sessions[index].sessionId,
      })
    );
  };
  const onClickHandler = () => {
    joinSessionStart().then(() => {
      navigate("/broadcast");
    });
  };

  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid item>
        <div
          style={{
            // height: "100",
            // maxHeight: "40vw",
            // minHeight: 0,
            // minWidth: 0,
            maxWidth: "60vw",
            width: "100%",
            // overflow: "hidden",
          }}
        >
          {/* 캐러셀 안 나올 때 아래 h1 태그를 추가해볼 것 */}
          <p style={{ color: "white", fontSize: 1 }}>Hi</p>
          <Swiper
            modules={[EffectCards, Navigation, Pagination]}
            navigation
            effect={"cards"}
            spaceBetween={30}
            pagination={{ clickable: true }}
            loop={true}
            slidesPerView={1}
            onSlideChange={(swiper) => setIndex(swiper.realIndex)}
            onSwiper={(swiper) => console.log(swiper)}
            className="mySwiper"
          >
            {props.sessions.length !== 0
              ? props.sessions.map((session, index) => (
                  <SwiperSlide key={session.sessionId} onClick={onClickHandler}>
                    <CarouselComp
                      nth={index + 1}
                      title={session.title}
                      nickname={session.streamer.nickName}
                      caption={true}
                      userAvatar={session.streamer.avatar}
                      hashTag={session.hashTag}
                      startAt={session.startAt}
                    >
                      <img
                        src={session.thumbnail}
                        alt={session.title}
                        // style={{ width: "90%" }}
                      />
                    </CarouselComp>
                  </SwiperSlide>
                ))
              : basicList.map((item, index) => (
                  <SwiperSlide>
                    <CarouselCompBasic nth={index}>
                      <img src={basicCarousel} />
                    </CarouselCompBasic>
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </Grid>
    </Grid>
  );
};

export default BroadcastCarousel;
