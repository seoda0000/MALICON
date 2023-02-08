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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/configStore";

const BroadcastCarousel: React.FC<{ sessions: SessionType[] }> = (props) => {
  // 방송 진입
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // const joinSession() {
  //   // 리덕스에 저장하기 전에 호출되어서 프롭스에 안담겼음
  //   dispatch(joinSession(sessionId)).then(()=>{
  //     navigate("/video");
  //   });

  // }

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
          {/* <h1 style={{ color: "white" }}>Hi</h1> */}
          <Swiper
            modules={[EffectCards, Navigation, Pagination]}
            navigation
            effect={"cards"}
            spaceBetween={30}
            pagination={{ clickable: true }}
            loop={true}
            slidesPerView={1}
            onSlideChange={(swiper) => console.log(swiper)}
            onSwiper={(swiper) => console.log(swiper)}
            className="mySwiper"
          >
            {props.sessions.length !== 0 ? (
              props.sessions.map((session) => (
                <SwiperSlide key={session.sessionId}>
                  <CarouselComp
                    nth={3}
                    title={session.title}
                    nickname={session.streamer.nickName}
                    caption={true}
                    userAvatar={session.streamer.avatar}
                    hashTags={session.hashtags}
                  >
                    <img
                      src={session.thumbnail}
                      alt={session.title}
                      // style={{ width: "90%" }}
                    />
                  </CarouselComp>
                </SwiperSlide>
              ))
            ) : (
              <div>실시간 방송이 없습니다.</div>
            )}
          </Swiper>
        </div>
      </Grid>
    </Grid>
  );
};

export default BroadcastCarousel;
