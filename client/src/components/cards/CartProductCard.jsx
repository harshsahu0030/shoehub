import { useMutation } from "@tanstack/react-query";
import propTypes from "prop-types";
import toast from "react-hot-toast";
import {
  removeProductCartApi,
  UpdateProductCartApi,
} from "../../app/api/userApi";
import { useContext } from "react";
import { AuthContext } from "../../context/Authuser";
import { FiPlus, FiMinus } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import SelectInput from "../inputs/SelectInput";

const CartProductCard = ({ data, refetch }) => {
  const { refetch: userRefetch } = useContext(AuthContext);

  //react-quries
  const { mutate: updateMutation, isPending: updatePending } = useMutation({
    mutationFn: UpdateProductCartApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      userRefetch();
      refetch();
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: removeProductCartApi,

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
    <div className="flex gap-2 h-[30vh] md:h-[25vh] lg:h-[20vh] xl:h-[30vh] border border-lightGray/30 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-lightGray-500/50 bg-lightGray/10 px-5">
      {/* top  */}
      <div className="h-full flex justify-center items-center w-[40%] bg-transparent">
        <img
          src={data.product.images[0].url}
          alt="product image"
          loading="lazy"
          className="h-full object-contain"
        />
      </div>

      {/* bottom  */}
      <div className="flex flex-col justify-center gap-2 h-full w-[60%] text-xs">
        <div className="flex flex-col">
          <h5 className="uppercase font-bold line-clamp-1">
            {data.product.brand}
          </h5>
          <p className="line-clamp-2 font-medium">{data.product.title}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-base font-bold">
            {" "}
            {data.product.price.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "INR",
            })}
          </span>
          <span className="text-xs line-through font-bold text-lightGray">
            {data.product.mrp.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "INR",
            })}
          </span>
        </div>

        {/* quantity */}
        <div className="flex items-center gap-2 text-md md:text-lg">
          <button
            className="p-2 hover:scale-125 transition-all"
            disabled={updatePending}
            onClick={() =>
              updateMutation({
                updateCardDetails: {
                  quantity: data.quantity - 1,
                },
                id: data._id,
              })
            }
          >
            <FiMinus />
          </button>
          <span className="p-2 bg-lightGray/20">{data.quantity}</span>
          <button className="p-2 hover:scale-125 transition-all">
            <FiPlus
              disabled={updatePending}
              onClick={() =>
                updateMutation({
                  updateCardDetails: {
                    quantity: data.quantity + 1,
                  },
                  id: data._id,
                })
              }
            />
          </button>
        </div>

        <div className="flex justify-between items-center">
          {/* size  */}
          <div className="flex items-center gap-1">
            <span className="text-md font-semibold">Size : </span>
            <SelectInput
              id={"cart-product-size"}
              type={"text"}
              name={"size"}
              value={data.size}
              onChange={(e) =>
                updateMutation({
                  updateCardDetails: {
                    size: e.target.value,
                  },
                  id: data._id,
                })
              }
              options={data?.product?.sizes?.map((item) => item.size)}
              occasion={"cart"}
            />
          </div>

          <button
            className="w-fit text-xl p-1 border font-semibold rounded-lg py-1 bg-red-500 text-white hover:bg-red-600 transition-all"
            onClick={() => mutate(data._id)}
            disabled={isPending}
          >
            <MdDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

CartProductCard.propTypes = {
  data: propTypes.object,
  refetch: propTypes.func,
};

export default CartProductCard;
