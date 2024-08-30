import { useEffect, useLayoutEffect, useState } from "react";
import useBackToTop from "../hook/useBackToTop";
import ProductCard from "../components/cards/ProductCard";
import Filters from "../components/Filters";
import MetaData from "../utils/MetaData";
import { getAllProductsApi } from "../app/api/productApi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "react-router-dom";
import { categories } from "../data/category";
import ProductCardLoader from "../components/loaders/ProductCardLoader";
import Page from "../components/Page";

const Products = () => {
  const backToTopHanlder = useBackToTop();
  let [searchParams, setSearchParams] = useSearchParams();

  //filter states
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryArr, setCategoryArr] = useState([]);
  const [color, setColor] = useState([]);
  const [lPrice, setLPrice] = useState();
  const [hPrice, setHPrice] = useState();
  const [lRating, setLRating] = useState();
  const [discount, setDiscount] = useState();
  const [page, setPage] = useState(1);

  //react-queries
  const {
    isError,
    data: productsData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "get-all-product",
      gender,
      category,
      color,
      lPrice,
      hPrice,
      lRating,
      discount,
      page,
    ],
    queryFn: () =>
      getAllProductsApi({
        gender,
        category,
        color,
        lPrice,
        hPrice,
        lRating,
        discount,
        page,
      }),
  });

  //useEffect
  useEffect(() => {
    if (isLoading) {
      backToTopHanlder();
    }
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isError, error, isLoading, backToTopHanlder]);

  useEffect(() => {
    if (searchParams.get("g") !== null) {
      setGender(searchParams.get("g"));
      setCategoryArr(
        categories.find((cat) => cat.gender === searchParams.get("g")).types
      );
    }
    if (searchParams.get("cat") !== null) {
      setCategory(searchParams.get("cat").split(" "));
    }
    if (searchParams.get("ratl") !== null) {
      setLRating(searchParams.get("ratl"));
    }
    if (searchParams.get("dis") !== null) {
      setDiscount(searchParams.get("dis"));
    }
    if (searchParams.get("col") !== null) {
      setColor(searchParams.get("col").split(" "));
    }
    if (searchParams.get("p") !== null) {
      setPage(searchParams.get("p"));
    }
  }, [searchParams]);

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
            <Filters
              gender={gender}
              setGender={setGender}
              category={category}
              setCategory={setCategory}
              categoryArr={categoryArr}
              setCategoryArr={setCategoryArr}
              lPrice={lPrice}
              setLPrice={setLPrice}
              hPrice={hPrice}
              setHPrice={setHPrice}
              lRating={lRating}
              setLRating={setLRating}
              color={color}
              setColor={setColor}
              discount={discount}
              setDiscount={setDiscount}
              page={page}
              setPage={setPage}
              refetch={refetch}
            />
          </div>

          {/* right  */}
          <div className="flex flex-col gap-10 w-[100%] md:w-[70%] xl:w-[80%]">
            <div className="h-full grid grid-cols-4 gap-3 overflow-hidden">
              {!isLoading ? (
                productsData?.data?.products?.map((item) => (
                  <ProductCard key={item._id} data={item} />
                ))
              ) : (
                <ProductCardLoader />
              )}
            </div>
            <Stack className="flex items-center justify-center" spacing={2}>
              <Page
                products={productsData?.data?.filteredProductsCount}
                resultPerPage={productsData?.data?.resultPerPage}
                setPage={setPage}
                page={parseInt(page)}
              />
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
