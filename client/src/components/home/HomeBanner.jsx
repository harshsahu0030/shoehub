import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import propTypes from "prop-types";

// import required modules
import { Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const HomeBanner = ({ data }) => {
  const navigate = useNavigate();

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
                onClick={() =>
                  navigate(
                    `${item.url}?${
                      item.query.gender ? `&g=${item.query.gender}` : ""
                    }${
                      item.query.category
                        ? `&cat=${item.query.category?.join(" ")}`
                        : ""
                    }${
                      item.query.discount ? `&dis=${item.query.discount}` : ""
                    }${
                      item.query.color
                        ? `&col=${item.query.color?.join(" ")}`
                        : ""
                    }`
                  )
                }
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
