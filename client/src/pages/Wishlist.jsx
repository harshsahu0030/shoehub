import { useLayoutEffect } from "react";
import useBackToTop from "../hook/useBackToTop";
import MetaData from "../utils/MetaData";

const Wishlist = () => {
  const backToTopHanlder = useBackToTop();

  useLayoutEffect(() => {
    backToTopHanlder();
  }, []);
  return (
    <>
      <MetaData
        title={`Shoehub | Wishlist`}
        description={`user wishlist`}
        keywords={`wishlist, buy later`}
      />
      <div className="flex flex-col gap-3 mt-10 w-full">
        <h1 className="text-3xl font-semibold">Your Wishlist</h1>

        <hr className="border-b-2 border-lightGray/50" />
      </div>
    </>
  );
};

export default Wishlist;
