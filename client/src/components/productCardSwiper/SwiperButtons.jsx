import { useSwiper } from "swiper/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import propTypes from "prop-types";

const SwiperButtons = ({ swiperchange }) => {
  const swiper = useSwiper();

  return (
    <div className="h-full w-full absolute flex items-center top-0">
      <button
        onClick={() => swiper.slidePrev()}
        className={`absolute text-xl left-0 z-10 py-6 px-1 bg-white border border-lightGray/50 ${
          swiperchange <= 0 ? "invisible" : "visible"
        }`}
      >
        <IoIosArrowBack />
      </button>
      <button
        onClick={() => swiper.slideNext()}
        className={`absolute text-xl right-0 z-10 py-6 px-1 bg-white border border-lightGray/50`}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

SwiperButtons.propTypes = {
  swiperchange: propTypes.number,
};

export default SwiperButtons;
