import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const SliderGender = ({
  item,
  toggleSliderbarGenderHandler,
  toggleSliderbarHandler,
}) => {
  const navigate = useNavigate();

  //functions
  const onClickLinkHandler = (link) => {
    navigate(link);
    toggleSliderbarGenderHandler("close", {});
    toggleSliderbarHandler();
  };

  return (
    <div className="h-full w-full bg-stone-800 flex">
      {/* left  */}
      <div
        className="w-[20%] flex items-center justify-center"
        onClick={() => toggleSliderbarGenderHandler("close", {})}
      >
        <MdOutlineKeyboardArrowRight className="text-5xl text-white" />
      </div>

      {/* right  */}
      {item && (
        <div className="w-[80%] bg-white flex flex-col gap-4 overflow-y-scroll">
          {/* heading */}
          <div className="flex flex-col gap-1 px-4 py-6 font-semibold bg-black text-white">
            <div className="flex flex-col">
              <span className="text-sm ">Gender</span>
              <span className="flex flex-col gap-1 text-xl capitalize">
                {item.gender}
              </span>
            </div>
          </div>

          {/* Bottom  */}
          <ul className="flex flex-col gap-3 text-lg">
            <li
              className="capitalize font-semibold py-2 transition-all ease-in-out duration-200 flex items-center justify-between hover:bg-lightGray/20 px-4 border-b border-lightGray/40"
              onClick={() => onClickLinkHandler(`/products?g=${item.gender}`)}
            >
              {item.gender}
            </li>
            {item.types?.map((type, i) => (
              <li
                key={i}
                className="capitalize font-semibold py-2 transition-all ease-in-out duration-200 flex items-center justify-between hover:bg-lightGray/20 px-4 border-b border-lightGray/40"
                onClick={() =>
                  onClickLinkHandler(`/products?g=${item.gender}&cat=${type}`)
                }
              >
                {type}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

SliderGender.propTypes = {
  item: propTypes.object,
  toggleSliderbarGenderHandler: propTypes.func,
  toggleSliderbarHandler: propTypes.func,
};

export default SliderGender;
