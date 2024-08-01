import { IoIosArrowRoundForward } from "react-icons/io";

const RoundedButton = () => {
  return (
    <button className="w-fit flex items-center gap-1 px-4 py-1 rounded-full border border-lightGray capitalize font-medium text-xs md:text-sm transition-all ease-in-out duration-200 hover:border-blue hover:text-blue text-nowrap">
      see all
      <IoIosArrowRoundForward className="text-lg" height={30} width={30} />
    </button>
  );
};

export default RoundedButton;
