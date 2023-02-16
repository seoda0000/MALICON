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

const basicCarousel_1 = require("../../assets/img/basic_1.png");
const basicCarousel_2 = require("../../assets/img/basic_2.jpg");
// const basicCarousel_3 = require("../../assets/img/basic_3.jpg");

const basicList = [basicCarousel_1, basicCarousel_2];

const BroadcastCarousel: React.FC<{ sessions: SessionType[] }> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const joinSessionStart = async () => {
    dispatch(
      broadcastActions.loadCurrentSession({
        currentSession: props.sessions[index],
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
            height: "100%",
            maxHeight: "35vw",
            minHeight: "35vw",
            minWidth: "60vw",
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
            // onSwiper={(swiper) => console.log(swiper)}
            className="mySwiper"
          >
            {props.sessions.length !== 0
              ? props.sessions.map((session, index) => (
                  <SwiperSlide key={session.sessionId} onClick={onClickHandler}>
                    <CarouselComp
                      nth={index}
                      title={session.title}
                      nickname={session.streamer.nickName}
                      caption={true}
                      userAvatar={session.streamer.avatar}
                      hashTag={session.hashTag}
                      startAt={session.startAt}
                    >
                      <BroadcastCarouselItem session={session} />
                    </CarouselComp>
                  </SwiperSlide>
                ))
              : basicList.map((item, index) => (
                  <SwiperSlide>
                    <CarouselCompBasic nth={index}>
                      <img src={item} alt="" />
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
