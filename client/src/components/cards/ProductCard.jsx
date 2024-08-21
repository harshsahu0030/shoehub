import { IoMdHeartEmpty } from "react-icons/io";
import { IoStarSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";

const ProductCard = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 h-96 border border-lightGray/30 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-lightGray-500/50 group/card-image">
      {/* top  */}
      <div className="relative h-[70%] container bg-white overflow-hidden">
        <img
          src={data.images[0].url}
          alt="product image"
          loading="lazy"
          className="h-full container object-contain group-hover/card-image:scale-110 transition-all ease-in-out duration-300"
          onClick={() =>
            navigate(
              `/products/${data.gender.toLowerCase()}/${data.category.toLowerCase()}/${
                data._id
              }`
            )
          }
        />
        <div className="absolute flex gap-1 items-center bottom-1 left-1 text-xs font-bold bg-white/90 py-1 px-2 rounded-sm">
          <span className="flex items-center gap-1">
            {data.ratings.toFixed(2)}
            <IoStarSharp className="text-blue" />
          </span>{" "}
          |<span> {data.numOfReviews}</span>
        </div>

        <div className="absolute flex gap-1 items-center top-1 left-1 text-base font-semibold bg-cyan/80 py-1 px-2 rounded-sm">
          <span className="flex items-center gap-1">
            {data.discount.toFixed(0)}%
          </span>{" "}
        </div>

        <div className="absolute items-center top-1 right-2 text-xl hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer bg-white p-2 rounded-3xl">
          <IoMdHeartEmpty />
        </div>
      </div>

      {/* bottom  */}
      <div
        className="flex flex-col gap-2 h-[30%] container px-2 text-sm"
        onClick={() =>
          navigate(
            `/products/${data.gender.toLowerCase()}/${data.category.toLowerCase()}/${
              data._id
            }`
          )
        }
      >
        <div className="flex flex-col">
          <h5 className="uppercase font-bold line-clamp-1">{data.brand}</h5>
          <p className="line-clamp-2 font-medium">{data.title}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-lg font-bold">
            {data.price.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "INR",
            })}
          </span>
          <span className="text-sm line-through font-bold text-lightGray">
            {data.mrp.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "INR",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  data: propTypes.object,
};

export default ProductCard;
