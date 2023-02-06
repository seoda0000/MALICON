import { SwiperSlide } from "swiper/react";

const BroadcastCarouselItem: React.FC<{ session: any }> = (props) => {
  return (
    <SwiperSlide>
      <img
        src={props.session.thumbnail}
        alt={props.session.title}
        style={{ width: "90%" }}
      />
    </SwiperSlide>
  );
};

export default BroadcastCarouselItem;
