import { IoMdHeartEmpty } from "react-icons/io";
import { tempProduct } from "../../data/product";
import { IoStarSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ProductCard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 h-96 border border-lightGray/30 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-lightGray-500/50">
      {/* top  */}
      <div className="relative h-[70%] container bg-white">
        <img
          src={tempProduct.images[0].url}
          alt="product image"
          loading="lazy"
          className="h-full container object-contain"
          onClick={() =>
            navigate(
              `/products/men/running shoes/Men Solid Downshifter 12 Regular Road Running Shoes`
            )
          }
        />
        <div className="absolute flex gap-1 items-center bottom-1 left-1 text-xs font-bold bg-lightGray/40 py-1 px-2 rounded-sm">
          <span className="flex items-center gap-1">
            4.5 <IoStarSharp className="text-blue" />
          </span>{" "}
          |<span> 22</span>
        </div>

        <div className="absolute flex gap-1 items-center top-1 left-1 text-base font-semibold bg-cyan/50 py-1 px-2 rounded-sm">
          <span className="flex items-center gap-1">10%</span>{" "}
        </div>

        <div className="absolute items-center bottom-1 right-2 text-2xl hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer">
          <IoMdHeartEmpty />
        </div>
      </div>

      {/* bottom  */}
      <div
        className="flex flex-col gap-2 h-[30%] container px-2 text-sm"
        onClick={() =>
          navigate(
            `/products/men/running shoes/Men Solid Downshifter 12 Regular Road Running Shoes`
          )
        }
      >
        <div className="flex flex-col">
          <h5 className="uppercase font-bold line-clamp-1">
            {tempProduct.brand}
          </h5>
          <p className="line-clamp-2 font-medium">{tempProduct.title}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">₹1000</span>
          <span className="text-sm line-through font-bold text-lightGray">
            ₹2000
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
