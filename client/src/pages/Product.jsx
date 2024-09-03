import { useEffect, useLayoutEffect } from "react";
import useBackToTop from "../hook/useBackToTop";
import ImagesThumb from "../components/product/ImagesThumb";
import ProductDetails from "../components/product/ProductDetails";
import AddtionalDetails from "../components/product/AddtionalDetails";
import MetaData from "../utils/MetaData";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getProductsApi, getSimilarProductsApi } from "../app/api/productApi";
import { useQuery } from "@tanstack/react-query";
import HomeHeading from "../components/home/HomeHeading";
import ProductCardSwiper from "../components/productCardSwiper/ProductCardSwiper";
import Loader from "../components/loaders/Loader";

const Product = () => {
  const backToTopHanlder = useBackToTop();
  const { id } = useParams();

  //react-quries
  const {
    isLoading,
    isError,
    data: productData,
    error,
  } = useQuery({
    queryKey: ["get-product", id],
    queryFn: () => getProductsApi(id),
  });

  const {
    isLoading: similarLoading,
    isError: similarIsError,
    data: similarProducts,
    error: similarError,
  } = useQuery({
    queryKey: [
      "get-similar-products",
      productData?.data.product.gender,
      productData?.data.product.category,
    ],
    queryFn: () =>
      getSimilarProductsApi({
        gender: productData?.data.product.gender,
        category: productData?.data.product.category,
      }),
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
    if (similarIsError) {
      toast.error(similarError.response.data.message);
    }
  }, [isError, error, similarError, similarIsError]);

  useLayoutEffect(() => {
    backToTopHanlder();
  }, [backToTopHanlder]);

  return !productData && isLoading ? (
    <Loader />
  ) : (
    <>
      <MetaData
        title={`Shoehub | ${productData?.data.product.title}`}
        description={`${productData?.data.product.images.title}`}
        keywords={`${
          (productData?.data.product.title, productData?.data.product.brand)
        }`}
      />
      <div className="flex flex-col gap-10 pt-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20  h-[100%] lg:h-[40vh] xl:h-[80vh]">
          {/* images */}
          <div className="w-full h-[60vh] lg:h-[40vh] xl:h-[80vh]">
            <ImagesThumb images={productData?.data.product.images} />
          </div>

          {/* details  */}
          <div className="w-full h-[100%] lg:h-[40vh] xl:h-[80vh]">
            <ProductDetails product={productData?.data.product} />
          </div>
        </div>
        {/* additional details */}
        <div className="container h-full">
          <AddtionalDetails product={productData?.data.product} />
        </div>

        <hr className="border-b border-lightGray/30" />

        {/* similar product */}
        <HomeHeading
          title="SIMILAR"
          highlighted="PRODUCTS"
          description="More similar products for you"
          url={`/products?g=${productData?.data.product.gender}&cat=${productData?.data.product.category}`}
        />

        <ProductCardSwiper
          data={similarProducts?.data?.products}
          loading={similarLoading}
          type="similar"
        />
      </div>
    </>
  );
};

export default Product;
