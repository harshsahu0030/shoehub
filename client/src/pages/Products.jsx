import { useEffect, useLayoutEffect, useRef } from "react";
import useBackToTop from "../hook/useBackToTop";
import ProductCard from "../components/cards/ProductCard";
import Filters from "../components/Filters";
import useWindowSize from "../hook/useWindowSize";
import MetaData from "../utils/MetaData";

const Products = () => {
  const backToTopHanlder = useBackToTop();
  const windowSize = useWindowSize();

  // useEffect
  useEffect(() => {}, []);

  //useLayout
  useLayoutEffect(() => {
    backToTopHanlder();
  }, [backToTopHanlder]);
  return (
    <>
      <MetaData
        title={`Shoehub | Products`}
        description={`Products list`}
        keywords={`products`}
      />
      <div className="flex flex-col gap-10 xl:gap-20">
        <div className="container flex gap-4 relative">
          {/* left  */}
          <div className="h-full hidden md:block md:w-[30%] xl:w-[20%]">
            <Filters />
          </div>

          {/* right  */}
          <div className="h-full grid grid-cols-4 gap-3 w-[100%] md:w-[70%] xl:w-[80%] rounded-lg overflow-hidden">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
