import { useLayoutEffect } from "react";
import useBackToTop from "../hook/useBackToTop";
import { tempProduct } from "../data/product";
import ImagesThumb from "../components/product/ImagesThumb";
import ProductDetails from "../components/product/ProductDetails";
import AddtionalDetails from "../components/product/AddtionalDetails";
import MetaData from "../utils/MetaData";

const Product = () => {
  const backToTopHanlder = useBackToTop();

  useLayoutEffect(() => {
    backToTopHanlder();
  }, []);
  return (
    <>
      <MetaData
        title={`Shoehub | ${tempProduct.title}`}
        description={`${tempProduct.title}`}
        keywords={`${(tempProduct.title, tempProduct.brand)}`}
      />
      <div className="flex flex-col gap-20">
        {/* section 01  */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20  h-[100%] lg:h-[40vh] xl:h-[80vh]">
          {/* images */}
          <div className="w-full h-[60vh] lg:h-[40vh] xl:h-[80vh]">
            <ImagesThumb images={tempProduct.images} />
          </div>

          {/* details  */}
          <div className="w-full h-[100%] lg:h-[40vh] xl:h-[80vh]">
            <ProductDetails product={tempProduct} />
          </div>
        </div>

        {/* additional details */}
        <div className="container h-full">
          <AddtionalDetails product={tempProduct} />
        </div>
      </div>
    </>
  );
};

export default Product;
