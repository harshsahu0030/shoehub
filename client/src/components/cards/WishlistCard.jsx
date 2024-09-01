import { IoStarSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import { removeProductWishlistApi } from "../../app/api/userApi";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../../context/Authuser";
import { useContext } from "react";

const WishlistCard = ({ data, refetch }) => {
  const navigate = useNavigate();
  const { refetch: userRefetch } = useContext(AuthContext);

  //react-quries
  const { mutate, isPending } = useMutation({
    mutationFn: removeProductWishlistApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      userRefetch();
      refetch();
    },
  });

  return (
    <div className="flex flex-col gap-2 h-100 border border-lightGray/30 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-lightGray-500/50 group/card-image">
      {/* top  */}
      <div className="relative h-[70%] container bg-white overflow-hidden">
        <img
          src={data.images[0].url}
          alt="product image"
          loading="lazy"
          className="h-full container object-contain group-hover/card-image:scale-110 transition-all ease-in-out duration-300"
          onClick={() => navigate(`/products/${data._id}`)}
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
      </div>

      {/* bottom  */}
      <div
        className="flex flex-col gap-2 h-[30%] container px-2 text-sm"
        onClick={() => navigate(`/products${data._id}`)}
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
      <button
        className="border font-semibold rounded-lg py-1 bg-red-600 text-white hover:bg-red-400 transition-all"
        disabled={isPending}
        onClick={() => mutate(data._id)}
      >
        Remove Product
      </button>
    </div>
  );
};

WishlistCard.propTypes = {
  data: propTypes.object,
  refetch: propTypes.func,
};

export default WishlistCard;
