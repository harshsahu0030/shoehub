// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

// import required modules
import { Navigation, FreeMode } from "swiper/modules";
import ProductCard from "../cards/ProductCard";
import { useState } from "react";
import SwiperButtons from "./SwiperButtons";
import useWindowSize from "../../hook/useWindowSize";
import ProductCardLoader from "../loaders/ProductCardLoader";
import propTypes from "prop-types";

const ProductCardSwiper = ({ data, loading, type }) => {
  const { width } = useWindowSize();

  //useState
  const [swiperchange, setSwiperchange] = useState(0);

  return (
    <div className="relative">
      {!loading ? (
        <Swiper
          slidesPerView={
            type === "similar"
              ? width <= 640
                ? 2
                : width <= 1024
                ? 4
                : 6
              : width <= 640
              ? 2
              : width <= 1024
              ? 3
              : 4
          }
          spaceBetween={10}
          modules={[Navigation, FreeMode]}
          className="h-[100%] w-[100%] overflow-hidden"
          onSlideChange={(swiper) => setSwiperchange(swiper.activeIndex)}
        >
          {data?.map((item) => (
            <SwiperSlide key={item._id}>
              <ProductCard data={item} />
            </SwiperSlide>
          ))}

          <SwiperButtons swiperchange={swiperchange} />
        </Swiper>
      ) : (
        <Swiper
          slidesPerView={width <= 640 ? 2 : width <= 1024 ? 3 : 4}
          spaceBetween={10}
          modules={[Navigation, FreeMode]}
          className="h-[100%] w-[100%] overflow-hidden"
          onSlideChange={(swiper) => setSwiperchange(swiper.activeIndex)}
        >
          {[
            ...Array(
              type === "similar"
                ? width <= 640
                  ? 2
                  : width <= 1024
                  ? 4
                  : 6
                : width <= 640
                ? 2
                : width <= 1024
                ? 3
                : 4
            ),
          ].map((_, i) => (
            <SwiperSlide key={i}>
              <ProductCardLoader />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

ProductCardSwiper.propTypes = {
  data: propTypes.array,
  loading: propTypes.bool,
  type: propTypes.string,
};

export default ProductCardSwiper;
