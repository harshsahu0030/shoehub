import { IoIosArrowRoundForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

const RoundedButton = ({ url }) => {
  const navigate = useNavigate();

  return (
    <button
      className="w-fit flex items-center gap-1 px-4 py-1 rounded-full border border-lightGray capitalize font-medium text-xs md:text-sm transition-all ease-in-out duration-200 hover:border-blue hover:text-blue text-nowrap"
      onClick={() => navigate(url && url)}
    >
      see all
      <IoIosArrowRoundForward className="text-lg" height={30} width={30} />
    </button>
  );
};

RoundedButton.propTypes = {
  url: propTypes.string,
};

export default RoundedButton;
