import propTypes from "prop-types";
import { createElement, useEffect } from "react";
import RoundedButton from "../buttons/RoundedButton";
import ImageLoader from "../loaders/ImageLoader";
import ProductCardHorizontal from "../cards/ProductCardHorizontal";
import BannerImage from "./BannerImage";
import { getTrendingProductsApi } from "../../app/api/productApi";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const HomeLeft = ({ data }) => {
  //react-queries
  const {
    isError: trendingIsError,
    data: trendingProductsData,
    error: trendingError,
  } = useQuery({
    queryKey: ["get-trending-products"],
    queryFn: getTrendingProductsApi,
    refetchOnWindowFocus: false,
  });

  //useEffect
  useEffect(() => {
    if (trendingIsError) {
      toast.error(trendingError.response.data.message);
    }
  }, [trendingIsError, trendingError]);

  return (
    <div className="flex flex-col gap-8">
      {/* images  */}
      <div className="flex md:flex-col gap-3 items-center h-400 h-[350px] md:h-[700px] lg:h-[900px] overflow-hidden">
        {data ? (
          data.banner.vertical.map((item, i) => (
            <BannerImage key={i} img={item.img} imgAlt={"banner image"} />
          ))
        ) : (
          <ImageLoader number={2} />
        )}
      </div>

      {/* features */}
      <div className="flex flex-col">
        {data &&
          data.features.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center gap-3 p-3 border border-lightGray"
            >
              {/* left  */}
              <div className="text-xl">{createElement(item.icon)}</div>

              {/* right  */}
              <span className="text-sm">{item.desc}</span>
            </div>
          ))}
      </div>

      {/* trending products */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <h5 className="text-md font-bold uppercase ">Trending Products</h5>
          <RoundedButton />
        </div>

        {trendingProductsData?.data?.products.slice(0, 7).map((item) => (
          <ProductCardHorizontal key={item._id} data={item} />
        ))}
      </div>
    </div>
  );
};

HomeLeft.propTypes = {
  data: propTypes.object,
};

export default HomeLeft;
