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

const BroadcastCarousel: React.FC<{ sessions: any[] }> = (props) => {
  return (
    <Grid container justifyContent={"center"} alignItems={"center"}>
      <Grid item>
        <div
          style={{
            height: "100",
            // maxHeight: "40vw",
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
                src="https://i.ytimg.com/vi/qe0gepQh8N0/maxresdefault.jpg"
                alt=""
                style={{ width: "90%" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://i.ytimg.com/vi/UzbBohF8Ba0/maxresdefault.jpg"
                alt=""
                style={{ width: "90%" }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <img
                src="https://i.ytimg.com/vi/7qIuReWbE28/maxresdefault.jpg"
                alt=""
                style={{ width: "90%" }}
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </Grid>
    </Grid>
  );
};

export default BroadcastCarousel;
