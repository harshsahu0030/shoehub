import { RiSearch2Line } from "react-icons/ri";

const SearchBox = () => {
  return (
    <div className="container flex justify-between overflow-hidden items-center h-full relative">
      <input
        type="text"
        name="search"
        placeholder="search..."
        className="container h-full outline-none border-2 border-lightGray bg-transparent pl-4 pr-20 bg-slate-200 rounded-lg transition-all duration-200 ease-in-out focus:border-cyan text-lg font-medium"
      />
      <RiSearch2Line
        className="absolute right-5 text-2xl cursor-pointer transition-all duration-200 ease-in-out hover:scale-110"
        height={50}
        width={50}
      />
    </div>
  );
};

export default SearchBox;
