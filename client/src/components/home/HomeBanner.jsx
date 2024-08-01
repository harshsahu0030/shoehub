import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import propTypes from "prop-types";

// import required modules
import { Autoplay } from "swiper/modules";

const HomeBanner = ({ data }) => {
  return (
    <>
      <Swiper
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="container"
      >
        {data &&
          data.map((item, i) => (
            <SwiperSlide key={i} className="container h-full">
              <img
                src={item.imgUrl}
                alt={item.alt}
                className="container h-full object-cover object-center cursor-pointer hover:opacity-80"
                height={300}
                width={500}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};

HomeBanner.propTypes = {
  data: propTypes.array,
};

export default HomeBanner;
