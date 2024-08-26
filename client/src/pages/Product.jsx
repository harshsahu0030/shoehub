import { useEffect, useLayoutEffect } from "react";
import useBackToTop from "../hook/useBackToTop";
import { tempProduct } from "../data/product";
import ImagesThumb from "../components/product/ImagesThumb";
import ProductDetails from "../components/product/ProductDetails";
import AddtionalDetails from "../components/product/AddtionalDetails";
import MetaData from "../utils/MetaData";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { getProductsApi } from "../app/api/productApi";
import { useQuery } from "@tanstack/react-query";

const Product = () => {
  const backToTopHanlder = useBackToTop();
  const { id } = useParams();

  //react-quries
  const {
    isError,
    data: productData,
    error,
  } = useQuery({
    queryKey: ["get-product"],
    queryFn: () => getProductsApi(id),
  });

  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isError, error]);

  useLayoutEffect(() => {
    backToTopHanlder();
  }, []);

  return !productData ? (
    "Loading"
  ) : (
    <>
      <MetaData
        title={`Shoehub | ${tempProduct.title}`}
        description={`${tempProduct.title}`}
        keywords={`${(tempProduct.title, tempProduct.brand)}`}
      />
      <div className="flex flex-col gap-10 pt-5">
        section 01
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
      </div>
    </>
  );
};

export default Product;
