import propTypes from "prop-types";
import { IoStarOutline, IoStar, IoStarHalf } from "react-icons/io5";
import moment from "moment";
import { useMutation } from "@tanstack/react-query";
import {
  AddProductCartApi,
  AddProductWishlistApi,
} from "../../app/api/userApi";
import toast from "react-hot-toast";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/Authuser";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({ product }) => {
  const {
    brand,
    title,
    mrp,
    price,
    discount,
    sizes,
    ratings,
    numOfReviews,
    _id,
    createdAt,
  } = product;

  const { refetch: userRefetch, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  //states
  const [addCardDetails, setAddCardDetails] = useState({
    size: "",
    quantity: 1,
  });

  //react-quries
  const { mutate, isPending } = useMutation({
    mutationFn: AddProductWishlistApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      userRefetch();
    },
  });

  const { mutate: addCart, isPending: addCartPending } = useMutation({
    mutationFn: AddProductCartApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      userRefetch();
    },
  });

  //useEffect
  useEffect(() => {
    if (product) {
      setAddCardDetails(() => {
        return { ...addCardDetails, size: product.sizes[0].size };
      });
    }
  }, [product]);

  return (
    product && (
      <div className="flex flex-col gap-5">
        {/* heading  */}
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-bold uppercase">{brand}</h4>
          <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
        </div>

        {/* category  */}
        <div className="flex gap-3 text-lg items-center">
          <div className="flex items-center text-blue text-lg ">
            {[...Array(5)].map((_, i) => {
              i += 1;

              return i <= ratings ? (
                <IoStar key={i} size={20} />
              ) : i - 1 < ratings ? (
                <IoStarHalf key={i} size={20} />
              ) : (
                <IoStarOutline key={i} size={20} />
              );
            })}
          </div>

          <span className="font-semibold text-base">({ratings}/5)</span>
          <span className="font-semibold text-base text-gray">
            {numOfReviews} reviews
          </span>
        </div>

        <hr className="border-b border-lightGray/30" />

        {/* price  */}
        <div className="flex gap-5 items-center">
          <span className="text-4xl font-bold">₹{price}</span>
          <span className="text-2xl line-through font-semibold text-gray">
            ₹{mrp}
          </span>
          <span className="text-lg font-semibold text-red-600">
            ( {discount} OFF% )
          </span>
        </div>

        <hr className="border-b border-lightGray/30" />

        {/* sizes  */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold">Available Size</h4>
            <div className="flex flex-wrap gap-3">
              {sizes?.map((item, i) => (
                <button
                  key={i}
                  className={`text-lg flex items-center justify-center font-medium h-14 w-14 border rounded-lg border-lightGray hover:bg-blue hover:text-white transition-all ease-in-out duration-200 ${
                    addCardDetails.size === item.size && "bg-blue/80 text-white"
                  }`}
                  onClick={() =>
                    setAddCardDetails({
                      ...addCardDetails,
                      size: item.size,
                    })
                  }
                >
                  {item.size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-b border-lightGray/30" />

        {/* button */}
        <div className="grid grid-cols-2 gap-3 text-sm md:text-lg font-semibold">
          {currentUser &&
          currentUser?.cart?.find((item) => item.product === _id) ? (
            <button
              className="w-ful0l py-3 bg-blue text-white rounded-md hover:bg-blue/80  border-2 border-lightGray transition-all ease-in-out duration-150"
              onClick={() => navigate("/cart")}
            >
              ALREADY IN CART
            </button>
          ) : (
            <button
              className="w-ful0l py-3 bg-blue text-white rounded-md hover:bg-blue/80  border-2 border-lightGray transition-all ease-in-out duration-150"
              onClick={() => addCart({ addCardDetails, id: _id })}
              disabled={addCartPending}
            >
              {isPending ? "LOADING..." : "ADD TO CART"}
            </button>
          )}

          {currentUser && currentUser?.wishlist?.includes(_id) ? (
            <button
              className="w-full py-3 border-2 border-lightGray rounded-md hover:bg-lightGray/30  transition-all ease-in-out duration-150"
              onClick={() => navigate("/wishlist")}
            >
              ADDED TO WISHLIST
            </button>
          ) : (
            <button
              className="w-full py-3 border-2 border-lightGray rounded-md hover:bg-lightGray/30  transition-all ease-in-out duration-150"
              onClick={() => mutate(_id)}
              disabled={isPending}
            >
              {isPending ? "LOADING..." : "  ADD TO WISHLIST"}
            </button>
          )}
        </div>

        {/* id  */}
        <div className="flex flex-col text-sm self-end font-semibold text-gray">
          <div className="flex items-center gap-3">
            <span>Product Id:</span>
            <span>{_id}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Created At:</span>
            <span>{moment(createdAt).fromNow()}</span>
          </div>
        </div>
      </div>
    )
  );
};

ProductDetails.propTypes = {
  product: propTypes.object,
};
export default ProductDetails;
