import { createElement, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { menuData } from "../../data/menu";
import { categories } from "../../data/category";

const MenuButton = () => {
  const [toggleMenuButton, setToggleMenuButton] = useState(false);

  //ref
  const menuButtonRef = useRef();

  // useEffect
  const toggleMenuButtonHandler = (value) => {
    setToggleMenuButton(value);
    if (value) {
      menuButtonRef.current.style.visibility = "visible";
      menuButtonRef.current.style.opacity = 1;
      menuButtonRef.current.style.height = "fit-content";
      menuButtonRef.current.style.padding = "16px";
    } else {
      menuButtonRef.current.style.visibility = "hidden";
      menuButtonRef.current.style.opacity = 0;
      menuButtonRef.current.style.height = "0%";
      menuButtonRef.current.style.padding = "0";
    }
  };

  return (
    <div className=" h-full container relative">
      <div
        className="relative text-md font-semibold container px-8 flex text-white gap-3 items-center justify-between h-full bg-cyan rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:bg-blue"
        onClick={() => toggleMenuButtonHandler(!toggleMenuButton)}
        style={{ backgroundColor: toggleMenuButton && "#0e73bb" }}
      >
        <IoMenu height={50} width={50} />
        <span>LOOK AT</span>
        {toggleMenuButton ? (
          <IoIosArrowUp height={30} width={30} />
        ) : (
          <IoIosArrowDown height={30} width={30} />
        )}
        <span className="absolute bottom-[-20%] left-[27%] text-[10px] font-medium text-black bg-slate-200  rounded-full px-3 leading-none py-1">
          ONE STOP SHOP
        </span>
      </div>

      <div
        ref={menuButtonRef}
        className="absolute w-[100%] h-[0%] opacity-0 invisible bg-white rounded-lg top-[120%] left-0 transition-all ease-in-out duration-300 columns-3 text-gray overflow-hidden shadow-lg shadow-lightGray-500/50 capitalize z-10 flex flex-col"
      >
        {categories &&
          categories.map((item, i) => (
            <Link
              key={i}
              to={`products?g=${item.gender}`}
              className="text-base font-semibold py-1 transition-all ease-in-out duration-200 hover:text-cyan flex items-center gap-2"
            >
              {createElement(item.icon)}
              {item.gender}
            </Link>
          ))}

        <hr className="container border-b-0 border-lightGray my-1" />

        {menuData &&
          menuData.categoryLinks.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="text-base font-semibold py-1 transition-all ease-in-out duration-200 hover:text-cyan flex items-center gap-2"
            >
              {createElement(item.icon)}
              {item.name}
            </Link>
          ))}

        <hr className="container border-b-0 border-lightGray my-1" />

        {menuData &&
          menuData.profileLinks.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="text-base font-semibold py-1 transition-all ease-in-out duration-200 hover:text-cyan flex items-center gap-2"
            >
              {createElement(item.icon)}
              {item.name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MenuButton;
