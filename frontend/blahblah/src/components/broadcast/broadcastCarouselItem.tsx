import { SwiperSlide } from "swiper/react";

const BroadcastCarouselItem: React.FC<{ session: any }> = (props) => {
  const decodedImage = decodeURIComponent(props.session.thumbnail);
  // const imageElement = document.createElement("img");
  // imageElement.src = `data:image/jpeg;base64,${decodedImage}`;
  return <img src={"data:image/jpeg;base64," + decodedImage} alt="" />;
};

export default BroadcastCarouselItem;
