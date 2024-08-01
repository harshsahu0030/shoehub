import { Link } from "react-router-dom";
import propTypes from "prop-types";
import LocationBox from "./LocationBox";
import { AiOutlineUser } from "react-icons/ai";
import { categories } from "../data/category";
import { createElement, useRef, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import SliderGender from "./SliderGender";
import { IoMdClose } from "react-icons/io";
import { menuData } from "../data/menu";

const Sliderbar = ({ toggleSliderbarHandler }) => {
  const [sliderGender, setSliderGender] = useState({});

  //ref
  const toggleSliderbarGenderRef = useRef();

  //functions
  const toggleSliderbarGenderHandler = (value, item) => {
    setSliderGender(() => item);
    if (value === "show") {
      toggleSliderbarGenderRef.current.style.visibility = "visible";
      toggleSliderbarGenderRef.current.style.left = "0";
      toggleSliderbarGenderRef.current.style.width = "100%";
      toggleSliderbarGenderRef.current.style.opacity = 1;
    } else {
      toggleSliderbarGenderRef.current.style.visibility = "hidden";
      toggleSliderbarGenderRef.current.style.left = "100%";
      toggleSliderbarGenderRef.current.style.width = "0%";
      toggleSliderbarGenderRef.current.style.opacity = 0;
    }
  };

  return (
    <div className="h-full w-full bg-black/80 flex">
      {/* left  */}
      <div
        className="w-[20%] flex items-center justify-center"
        onClick={() => toggleSliderbarHandler()}
      >
        <IoMdClose className="text-5xl text-white" />
      </div>

      {/* right  */}
      <div className="w-[80%] bg-white flex flex-col gap-4 overflow-y-scroll">
        {/* heading */}
        <div className="flex flex-col gap-1 px-4 py-6 font-semibold bg-black text-white">
          <Link to="" className="flex items-center justify-end text-md gap-1">
            Sign in <AiOutlineUser className="text-lg" />
          </Link>

          <Link to={"/"} className="flex flex-col">
            <span className="text-sm ">Browse</span>
            <span className="flex flex-col gap-1 text-xl">SHOEHUB</span>
          </Link>
        </div>

        {/* Bottom  */}
        <div className="flex flex-col gap-3 text-lg">
          {/* location box  */}
          <div className="h-[8vh] px-4">
            <LocationBox />
          </div>

          <hr className="w-full border-b-4 text-lightGray/30" />

          <div className="flex flex-col gap-4">
            <h4 className="font-bold px-4">Gender</h4>

            <div className="flex flex-col gap-1 capitalize">
              {categories &&
                categories.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => toggleSliderbarGenderHandler("show", item)}
                    className=" font-semibold py-2 transition-all ease-in-out duration-200 flex items-center justify-between hover:bg-lightGray/20 px-4"
                  >
                    <span className="flex items-center gap-2">
                      {createElement(item.icon)}
                      {item.gender}
                    </span>

                    <MdOutlineKeyboardArrowRight className="text-xl" />
                  </div>
                ))}
            </div>

            {/* slider gender  */}
            <div
              ref={toggleSliderbarGenderRef}
              className="fixed h-[100vh] w-[0%] invisible top-0 left-[100%] z-50 transition-all ease-in-out duration-500 opacity-00"
            >
              <SliderGender
                item={sliderGender && sliderGender}
                toggleSliderbarGenderHandler={toggleSliderbarGenderHandler}
                toggleSliderbarHandler={toggleSliderbarHandler}
              />
            </div>
          </div>

          <hr className="w-full border-b-4 text-lightGray/30" />

          <div className="flex flex-col gap-4">
            <h4 className="font-bold px-4">Trending</h4>
          </div>

          <div className="flex flex-col gap-1 capitalize">
            {menuData &&
              menuData.categoryLinks.map((item, i) => (
                <div
                  key={i}
                  className=" font-semibold py-2 transition-all ease-in-out duration-200 flex items-center justify-between hover:bg-lightGray/20 px-4"
                >
                  {item.name}
                </div>
              ))}
          </div>

          <hr className="w-full border-b-4 text-lightGray/30" />

          <div className="flex flex-col gap-4">
            <h4 className="font-bold px-4">Profile</h4>
          </div>

          <div className="flex flex-col gap-1 capitalize">
            {menuData &&
              menuData.profileLinks.map((item, i) => (
                <div
                  key={i}
                  className=" font-semibold py-2 transition-all ease-in-out duration-200 flex items-center justify-between hover:bg-lightGray/20 px-4"
                >
                  {item.name}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

Sliderbar.propTypes = {
  toggleSliderbarHandler: propTypes.func,
};

export default Sliderbar;
