import { useState } from "react";
import propTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ImagesThumb = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="h-[100%] w-[100%]">
      <Swiper
        style={{
          "--swiper-navigation-color": "#000000",
          "--swiper-pagination-color": "#000000",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-[75%]"
      >
        {images &&
          images.map((item, i) => (
            <SwiperSlide key={i}>
              <img src={item.url} className="h-full w-full object-contain" />
            </SwiperSlide>
          ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-[25%] mt-5"
      >
        {images &&
          images.map((item, i) => (
            <SwiperSlide key={i}>
              <img
                src={item.url}
                className="h-full w-full object-contain rounded-lg overflow-hidden border border-lightGray/50 bg-white cursor-pointer"
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

ImagesThumb.propTypes = {
  images: propTypes.array,
};

export default ImagesThumb;
