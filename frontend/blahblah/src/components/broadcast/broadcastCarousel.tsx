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
// Import Swiper styles

const BroadcastCarousel: React.FC<{}> = (props) => {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid item>
        <div
          style={{
            height: "100",
            maxHeight: "40vw",
            minHeight: 0,
            minWidth: 0,
            maxWidth: "70vw",
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Swiper
            modules={[EffectCards, Navigation, Pagination]}
            navigation
            effect={"cards"}
            // creativeEffect={{
            //   prev: {
            //     shadow: true,
            //     translate: [0, 0, -400],
            //   },
            //   next: {
            //     translate: ["100%", 0, 0],
            //   },
            // }}
            style={{ width: "auto" }}
            spaceBetween={30}
            pagination={{ clickable: true }}
            loop={true}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            className="mySwiper"
          >
            <SwiperSlide>
              <img
                src="https://i.ytimg.com/an_webp/pRKqQqHRGGI/mqdefault_6s.webp?du=3000&sqp=CP6Xgp8G&rs=AOn4CLCvPpT57lcbcb74BxqejJExqrRZ8w"
                alt=""
                style={{ width: "90%" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://i.ytimg.com/vi/WwM95qPPOLA/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBHkOg7NDIiI_Uot3umfejXNGOC5A"
                alt=""
                style={{ width: "100%" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg"
                alt=""
                style={{ width: "100%" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg"
                alt=""
                style={{ width: "100%" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://i.ytimg.com/an_webp/REPZc2nzlyw/mqdefault_6s.webp?du=3000&sqp=CMDqgZ8G&rs=AOn4CLBtndlUPQM9S19n0_MK3I0CoJJmrw"
                alt=""
                style={{ width: "100%" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                // src="https://smentcorporation.s3.amazonaws.com/upload/editor/presscenter/2022/11/25/Nr3vuojPFK8a074b742e78438d8e115e89870a22d1shia4t95R0nof2pitw.zfe.jpg"
                alt=""
                style={{ width: "100%" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg"
                alt=""
                style={{ width: "100%" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg"
                alt=""
                style={{ width: "100%" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg"
                alt=""
                style={{ width: "100%" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://media.wired.co.uk/photos/60c8730fa81eb7f50b44037e/3:2/w_3329,h_2219,c_limit/1521-WIRED-Cat.jpeg"
                alt=""
                style={{ width: "100%" }}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </Grid>
    </Grid>
  );
};

export default BroadcastCarousel;
