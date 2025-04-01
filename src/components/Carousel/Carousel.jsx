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
          300: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1440: { slidesPerView: 5 },
          2560: { slidesPerView: 6 },
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
