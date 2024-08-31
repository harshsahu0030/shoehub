import LocationBox from "./LocationBox";
import Logo from "/logo.png";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { IoMenu } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { navbar } from "../data/navbar";
import { createElement, useContext, useEffect, useRef } from "react";
import Sliderbar from "./Sliderbar";
import { AuthContext } from "../context/Authuser";
import UserSearchBox from "./UserSearchBox";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  //ref
  const toggleSliderbarRef = useRef();

  //functions
  const toggleSliderbarHandler = (value) => {
    if (value === "show") {
      toggleSliderbarRef.current.style.visibility = "visible";
      toggleSliderbarRef.current.style.left = "0";
      toggleSliderbarRef.current.style.width = "100%";
      toggleSliderbarRef.current.style.opacity = 1;
      document.body.style.overflow = "hidden";
    } else {
      toggleSliderbarRef.current.style.visibility = "hidden";
      toggleSliderbarRef.current.style.left = "100%";
      toggleSliderbarRef.current.style.width = "0%";
      toggleSliderbarRef.current.style.opacity = 0;
      document.body.style.overflow = "visible";
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="container h-[100%] text-md flex items-center gap-6 py-1 md:py-2 justify-between">
      {/* left  */}
      <div className="w-[40%] sm:w-[25%]  md:w-[20%] xl:w-[15%] h-full flex justify-start">
        <img
          src={Logo}
          alt="webiste logo"
          loading="lazy"
          width={180}
          className="w-[100%] object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* center  */}
      <div className="w-[50%] lg:w-[60%] xl:w-[70%] gap-3 h-full hidden md:flex items-center">
        {/* location box */}
        <div className="w-[30%] h-full hidden xl:block">
          <LocationBox />
        </div>
        <div className="w-[100%] h-full xl:w-[70%]">
          <UserSearchBox />
        </div>
      </div>

      {/* right  */}
      <div className="w-[25%] lg:w-[20%] xl:w-[15%] h-full hidden md:flex items-center justify-between gap-3 ">
        <IoMdHeartEmpty
          className="text-5xl p-2 xl:p-3 border border-lightGray rounded-full cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 overflow-visible"
          onClick={() => navigate("/wishlist")}
        />
        <AiOutlineUser
          className="text-5xl p-2 xl:p-3 rounded-full cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 overflow-visible"
          onClick={() => navigate("/profile")}
        />
        <div className="relative block" onClick={() => navigate("/cart")}>
          <BsHandbag className="text-5xl p-2 xl:p-3 bg-pink-100 rounded-full cursor-pointer transition-all duration-200 ease-in-out hover:scale-110 overflow-visible" />

          {currentUser && (
            <span className="absolute h-5 w-5 flex items-center justify-center top-0 right-0 p-1 bg-red-400 text-xs text-white rounded-full">
              {currentUser?.cart?.length}
            </span>
          )}
        </div>
      </div>

      {/* mobile  */}
      <div className="md:hidden flex h-full items-center">
        <IoMenu
          className="text-4xl"
          height={50}
          width={50}
          onClick={() => toggleSliderbarHandler("show")}
        />
      </div>

      {/* bottom nav mobile  */}
      <div className="w-full grid grid-cols-5 place-items-center fixed left-0 bottom-0 bg-white h-[8vh] md:hidden z-20">
        {navbar &&
          navbar.navigations &&
          navbar.navigations.map((item, i) => (
            <div
              key={i}
              className="h-full w-full flex items-center justify-center text-3xl"
              onClick={() => navigate(item.url)}
            >
              {createElement(item.icon)}
            </div>
          ))}

        {/* sliderbar  */}
        <div
          ref={toggleSliderbarRef}
          className="fixed h-[100vh] w-[0%] invisible top-0 left-[100%] z-40 transition-all ease-in-out duration-500 opacity-0"
        >
          <Sliderbar toggleSliderbarHandler={toggleSliderbarHandler} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
