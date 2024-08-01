import { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { navbar } from "../data/navbar";

const LocationBox = () => {
  //states
  const [userlocation, setUserlocation] = useState("Select your City");

  //ref
  const toggleLocationRef = useRef();

  //functions
  const toggleFixedLocation = (value) => {
    if (value === "open") {
      toggleLocationRef.current.style.visibility = "visible";
      toggleLocationRef.current.style.opacity = 1;
    } else {
      toggleLocationRef.current.style.visibility = "hidden";
      toggleLocationRef.current.style.opacity = 0;
    }
  };

  const handleLocation = (value) => {
    setUserlocation(value);
    toggleFixedLocation();
  };

  return (
    <>
      <div
        className="relative container flex justify-between items-center h-full border-2 rounded-lg px-4 border-lightGray cursor-pointer transition-all ease-in-out duration-300 hover:border-cyan"
        onClick={() => toggleFixedLocation("open")}
      >
        <div className="flex flex-col">
          <span className="text-xs text-gray ">Your Location</span>
          <span className="text-md text-blue font-semibold leading-none line-clamp-1">
            {userlocation}
          </span>
        </div>
        <div>
          <IoIosArrowDown className="text-xl" height={30} width={30} />
        </div>
      </div>

      {/* fixed box  */}
      <div
        ref={toggleLocationRef}
        className="fixed h-[100vh] container bg-black/40 top-0 left-0 z-50 flex justify-center items-center invisible opacity-0 transition-all ease-in-out duration-500"
      >
        <div className="bg-white p-8 flex flex-col gap-3 rounded-lg">
          {/* top  */}
          <div className="flex gap-3 justify-between items-center pb-2 border-b border-lightGray">
            <div className="w-[80%]">
              <h4 className="text-lg font-bold capitalize">
                choose your location
              </h4>
              <span className="text-sm text-semibold text-gray">
                Enter your address and we will specify the offer for your area.
              </span>
            </div>

            <IoMdClose
              className="w-[20%] text-2xl transition-all ease-in-out duration-300 hover:scale-110 cursor-pointer"
              onClick={() => toggleFixedLocation()}
            />
          </div>

          {/* bottom  */}
          <ul className="flex flex-col h-[50vh] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-w-2 scrollbar-thumb-lightGray scrollbar-track-lightGray/20 overflow-y-scroll">
            {navbar
              ? Object.keys(navbar.states).map((item) => (
                  <li
                    key={item}
                    className="p-2 text-base hover:bg-lightGray/30"
                    onClick={() => handleLocation(navbar.states[item])}
                  >
                    {navbar.states[item]}
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>
    </>
  );
};

export default LocationBox;
