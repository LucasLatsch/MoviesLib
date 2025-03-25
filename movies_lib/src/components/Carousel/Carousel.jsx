import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Carousel.css";
import { Navigation, Pagination } from "swiper/modules";

const Carousel = ({ children, slidesPerView, spaceBetween, id }) => {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        navigation={{ nextEl: `.${id}-next`, prevEl: `.${id}-prev` }}
        loop={true}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: slidesPerView },
        }}
      >
        {children}
        <button className={`${id}-prev custom-prev`}>{"<"}</button>
        <button className={`${id}-next custom-next`}>{">"}</button>
      </Swiper>
    </div>
  );
};

export default Carousel;
