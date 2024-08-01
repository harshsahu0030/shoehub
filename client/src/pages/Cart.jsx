import { useLayoutEffect } from "react";
import useBackToTop from "../hook/useBackToTop";
import MetaData from "../utils/MetaData";

const Cart = () => {
  const backToTopHanlder = useBackToTop();

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
      </div>
    </>
  );
};

export default Cart;
