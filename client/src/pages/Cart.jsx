import { useEffect, useLayoutEffect } from "react";
import useBackToTop from "../hook/useBackToTop";
import MetaData from "../utils/MetaData";
import { useQuery } from "@tanstack/react-query";
import { getUserCartApi } from "../app/api/userApi";
import CartProductCard from "../components/cards/CartProductCard";
import CartSubTotal from "../components/CartSubTotal";
import toast from "react-hot-toast";

const Cart = () => {
  const backToTopHanlder = useBackToTop();

  //react-queries
  const {
    isError,
    data: cartData,
    error,
    isLoading: cartLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-cart"],
    queryFn: getUserCartApi,
    refetchOnWindowFocus: false,
  });

  //useEffect
  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isError, error]);

  useLayoutEffect(() => {
    backToTopHanlder();
  }, []);
  return (
    <>
      <MetaData
        title={"Shoehub | Cart"}
        description={"Cart page of shoehub"}
        keywords={"user cart, cart products"}
      />
      <div className="flex flex-col gap-3 mt-10 w-full">
        <h1 className="text-3xl font-semibold">Your Cart</h1>

        <hr className="border-b-2 border-lightGray/50" />

        <div className="flex flex-col-reverse lg:flex-row gap-10">
          {/* left */}
          <div className="w-[100%] lg:w-[65%] flex flex-col gap-5">
            {!cartLoading
              ? cartData?.data?.products.map((item) => (
                  <CartProductCard
                    key={item._id}
                    data={item}
                    f
                    refetch={refetch}
                  />
                ))
              : "Loading..."}
          </div>

          {/* right  */}
          <div className="w-[100%] lg:w-[30%]">
            <CartSubTotal />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
