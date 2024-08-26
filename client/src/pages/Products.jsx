import { useEffect, useLayoutEffect, useRef } from "react";
import useBackToTop from "../hook/useBackToTop";
import ProductCard from "../components/cards/ProductCard";
import Filters from "../components/Filters";
import useWindowSize from "../hook/useWindowSize";
import MetaData from "../utils/MetaData";
import { getAllProductsApi } from "../app/api/productApi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const Products = () => {
  const backToTopHanlder = useBackToTop();
  const windowSize = useWindowSize();

  //react-queries
  const {
    isError,
    data: productsData,
    error,
  } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: getAllProductsApi,
  });

  console.log(productsData);

  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isError, error]);

  //useLayout
  useLayoutEffect(() => {
    backToTopHanlder();
  }, []);
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
          <div className="flex flex-col gap-10 w-[100%] md:w-[70%] xl:w-[80%]">
            <div className="h-full grid grid-cols-4 gap-3 overflow-hidden">
              {productsData?.data?.products?.map((item) => (
                <ProductCard key={item._id} data={item} />
              ))}
            </div>
            <Stack className="flex items-center justify-center" spacing={2}>
              <Pagination
                count={10}
                color="primary"
                variant="outlined"
                shape="rounded"
              />
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
