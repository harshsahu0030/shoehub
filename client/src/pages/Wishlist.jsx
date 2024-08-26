import { useEffect, useLayoutEffect } from "react";
import useBackToTop from "../hook/useBackToTop";
import MetaData from "../utils/MetaData";
import WishlistCard from "../components/cards/WishlistCard";
import { getUserWishlistsApi } from "../app/api/userApi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Wishlist = () => {
  const backToTopHanlder = useBackToTop();

  //react-quries
  const { isError, data, error, refetch } = useQuery({
    queryKey: ["get-user-wishlists"],
    queryFn: getUserWishlistsApi,
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
        title={`Shoehub | Wishlist`}
        description={`user wishlist`}
        keywords={`wishlist, buy later`}
      />
      <div className="flex flex-col gap-3 mt-10 w-full">
        <h1 className="text-3xl font-semibold">Your Wishlist</h1>

        <hr className="border-b-2 border-lightGray/50" />

        <div className="grid grid-cols-5">
          {data && data?.data?.wishlist.length > 0
            ? data?.data?.wishlist.map((item) => (
                <WishlistCard key={item._id} data={item} refetch={refetch} />
              ))
            : "No products"}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
