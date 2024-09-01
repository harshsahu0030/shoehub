import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useBackToTop from "../hook/useBackToTop";
import ProductCard from "../components/cards/ProductCard";
import Filters from "../components/Filters";
import MetaData from "../utils/MetaData";
import { getAllProductsApi } from "../app/api/productApi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Stack from "@mui/material/Stack";
import { useSearchParams } from "react-router-dom";
import { categories, product_sorting_data } from "../data/category";
import ProductCardLoader from "../components/loaders/ProductCardLoader";
import Page from "../components/Page";
import { RiMenuFold2Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

const Products = () => {
  const backToTopHanlder = useBackToTop();
  let [searchParams, setSearchParams] = useSearchParams();

  //filter states
  const [filterStates, setFilterStates] = useState({
    gender: "",
    category: [],
    color: [],
    lPrice: "",
    hPrice: "",
    lRating: "",
    discount: "",
    sort: "",
    page: "",
  });

  //states
  const [keyword, setKeyword] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState([]);
  const [categoryArr, setCategoryArr] = useState([]);
  const [color, setColor] = useState([]);
  const [lPrice, setLPrice] = useState();
  const [hPrice, setHPrice] = useState();
  const [lRating, setLRating] = useState();
  const [discount, setDiscount] = useState();
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  // ref
  const toggleFilterRef = useRef();

  //react-queries
  const {
    isError,
    data: productsData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      "get-all-products",
      keyword,
      gender,
      category,
      color,
      lPrice,
      hPrice,
      lRating,
      discount,
      sort,
      page,
    ],
    queryFn: () =>
      getAllProductsApi({
        keyword,
        gender,
        category,
        color,
        lPrice,
        hPrice,
        lRating,
        discount,
        sort,
        page,
      }),
  });

  //functions
  const handleChangeGender = async (e) => {
    setGender(e.target.value);
    setCategoryArr(
      categories.find((cat) => cat.gender === e.target.value).types
    );
    setCategory([]);
    setPage(1);

    setSearchParams(
      `?${keyword !== "" ? `&keyword=${keyword}` : ""}${
        gender !== "" ? `&g=${e.target.value}` : ""
      }${lRating ? `&ratl=${lRating}` : ""}${
        discount ? `&dis=${discount}` : ""
      }${color && color.length > 0 ? `&col=${color?.join(" ")}` : ""}${
        lPrice ? `&lp=${lPrice}` : ""
      }${hPrice ? `&hp=${hPrice}` : ""}${
        sort !== "" ? `&sort=${sort?.split(",")?.join(" ")}` : ""
      }${page !== "" ? `&p=${page}` : ""}`
    );
  };

  const handleChangeCategory = async (e) => {
    let newCat = [...category];

    if (e.target.checked === true) {
      newCat.push(e.target.value);
    } else {
      let index = newCat.indexOf(e.target.value);
      newCat.splice(index, 1);
    }

    setCategory(newCat);
    setPage(1);

    setSearchParams(
      `?${keyword !== "" ? `&keyword=${keyword}` : ""}${
        gender !== "" ? `&g=${gender}` : ""
      }${category && category.length > 0 ? `&cat=${newCat?.join(" ")}` : ""}${
        lRating ? `&ratl=${lRating}` : ""
      }${discount ? `&dis=${discount}` : ""}${
        color && color.length > 0 ? `&col=${color?.join(" ")}` : ""
      }${lPrice ? `&lp=${lPrice}` : ""}${hPrice ? `&hp=${hPrice}` : ""}${
        sort !== "" ? `&sort=${sort?.split(",")?.join(" ")}` : ""
      }${page !== "" ? `&p=${page}` : ""}`
    );
  };

  const handleChangePrice = (value) => {
    setLPrice(value[0]);
    setHPrice(value[1]);
    setPage(1);

    setSearchParams(
      `?${keyword !== "" ? `&keyword=${keyword}` : ""}${
        gender !== "" ? `&g=${gender}` : ""
      }${lRating ? `&ratl=${lRating}` : ""}${
        discount ? `&dis=${discount}` : ""
      }${color && color.length > 0 ? `&col=${color?.join(" ")}` : ""}${
        lPrice ? `&lp=${value[0]}` : ""
      }${hPrice ? `&hp=${value[1]}` : ""}${
        sort !== "" ? `&sort=${sort?.split(",")?.join(" ")}` : ""
      }${page !== "" ? `&p=${page}` : ""}`
    );
  };

  const handleChangeRatings = async (e) => {
    setLRating(e.target.value);
    setPage(1);

    setSearchParams(
      `?${keyword !== "" ? `&keyword=${keyword}` : ""}${
        gender !== "" ? `&g=${gender}` : ""
      }${category && category.length > 0 ? `&cat=${category?.join(" ")}` : ""}${
        lRating ? `&ratl=${e.target.value}` : ""
      }${discount ? `&dis=${discount}` : ""}${
        color && color.length > 0 ? `&col=${color?.join(" ")}` : ""
      }${lPrice ? `&lp=${lPrice}` : ""}${hPrice ? `&hp=${hPrice}` : ""}${
        sort !== "" ? `&sort=${sort?.split(",")?.join(" ")}` : ""
      }${page !== "" ? `&p=${page}` : ""}`
    );
  };

  const handleChangeDiscount = async (e) => {
    setDiscount(e.target.value);
    setPage(1);

    setSearchParams(
      `?${keyword !== "" ? `&keyword=${keyword}` : ""}${
        gender !== "" ? `&g=${gender}` : ""
      }${category && category.length > 0 ? `&cat=${category?.join(" ")}` : ""}${
        lRating ? `&ratl=${lRating}` : ""
      }${discount ? `&dis=${e.target.value}` : ""}${
        color && color.length > 0 ? `&col=${color?.join(" ")}` : ""
      }${lPrice ? `&lp=${lPrice}` : ""}${hPrice ? `&hp=${hPrice}` : ""}${
        sort !== "" ? `&sort=${sort?.split(",")?.join(" ")}` : ""
      }${page !== "" ? `&p=${page}` : ""}`
    );
  };

  const handleChangeColor = async (e) => {
    let newCol = [...color];

    if (e.target.checked === true) {
      newCol.push(e.target.value);
    } else {
      let index = newCol.indexOf(e.target.value);
      newCol.splice(index, 1);
    }

    setColor(newCol);
    setPage(1);

    setSearchParams(
      `?${keyword !== "" ? `&keyword=${keyword}` : ""}${
        gender !== "" ? `&g=${gender}` : ""
      }${category && category.length > 0 ? `&cat=${category?.join(" ")}` : ""}${
        lRating ? `&ratl=${lRating}` : ""
      }${discount ? `&dis=${discount}` : ""}${
        color && color.length > 0 ? `&col=${newCol?.join(" ")}` : ""
      }${lPrice ? `&lp=${lPrice}` : ""}${hPrice ? `&hp=${hPrice}` : ""}${
        sort !== "" ? `&sort=${sort?.split(",")?.join(" ")}` : ""
      }${page !== "" ? `&p=${page}` : ""}`
    );
  };

  const handleSortProduct = (e) => {
    setSort(e.target.value);

    setSearchParams(
      `?${keyword !== "" ? `&keyword=${keyword}` : ""}${
        gender !== "" ? `&g=${gender}` : ""
      }${lRating ? `&ratl=${lRating}` : ""}${
        discount ? `&dis=${discount}` : ""
      }${color && color.length > 0 ? `&col=${color?.join(" ")}` : ""}${
        lPrice ? `&lp=${lPrice}` : ""
      }${hPrice ? `&hp=${hPrice}` : ""}${
        sort !== "" ? `&sort=${e.target.value?.split(",")?.join(" ")}` : ""
      }${page !== "" ? `&p=${page}` : ""}`
    );
  };

  const handleSetPage = (value) => {
    setPage(value);

    setSearchParams(
      `?${keyword !== "" ? `&keyword=${keyword}` : ""}${
        gender !== "" ? `&g=${gender}` : ""
      }${lRating ? `&ratl=${lRating}` : ""}${
        discount ? `&dis=${discount}` : ""
      }${color && color.length > 0 ? `&col=${color?.join(" ")}` : ""}${
        lPrice ? `&lp=${lPrice}` : ""
      }${hPrice ? `&hp=${hPrice}` : ""}${
        sort !== "" ? `&sort=${sort?.split(",")?.join(" ")}` : ""
      }${page !== "" ? `&p=${value}` : ""}`
    );
  };

  const handleToggleFilter = (value) => {
    if (value === "show") {
      toggleFilterRef.current.style.display = "flex";
      toggleFilterRef.current.style.flexDirection = "row";
      toggleFilterRef.current.style.position = "fixed";
      toggleFilterRef.current.style.top = 0;
      toggleFilterRef.current.style.left = 0;
      toggleFilterRef.current.style.zIndex = 50;
      toggleFilterRef.current.style.height = "100vh";
      toggleFilterRef.current.style.width = "100%";
      toggleFilterRef.current.style.overflowY = "scroll";
      document.body.style.overflow = "hidden";
    } else {
      toggleFilterRef.current.style.display = "none";
      document.body.style.overflow = "visible";
    }
  };

  //useEffect
  useEffect(() => {
    if (searchParams.get("keyword") !== null) {
      setKeyword(searchParams.get("keyword"));
    }
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
    if (searchParams.get("lp") !== null) {
      setLPrice(searchParams.get("lp"));
    }
    if (searchParams.get("hp") !== null) {
      setHPrice(searchParams.get("hp"));
    }
    if (searchParams.get("sort") !== null) {
      setSort(searchParams.get("sort").replace(" ", ","));
    }
    if (searchParams.get("p") !== null) {
      setPage(searchParams.get("p"));
    }
  }, [searchParams]);

  useEffect(() => {
    if (isLoading) {
      backToTopHanlder();
    }
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isError, error, isLoading, backToTopHanlder]);

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
          <div
            ref={toggleFilterRef}
            className="h-full hidden md:flex md:w-[30%] lg:w-[25%] xl:w-[20%] bg-white"
          >
            <Filters
              keyword={keyword}
              setKeyword={setKeyword}
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
              sort={sort}
              setSort={setSort}
              page={page}
              setPage={setPage}
              refetch={refetch}
              filterStates={filterStates}
              setFilterStates={setFilterStates}
              handleChangeGender={handleChangeGender}
              handleChangeCategory={handleChangeCategory}
              handleChangePrice={handleChangePrice}
              handleChangeDiscount={handleChangeDiscount}
              handleChangeColor={handleChangeColor}
              handleChangeRatings={handleChangeRatings}
            />

            <div
              className="flex items-center justify-center text-white w-[20%] h-[100vh] sticky top-0 bg-black/90 md:hidden text-2xl"
              onClick={handleToggleFilter}
            >
              <IoMdClose />
            </div>
          </div>

          {/* right  */}
          <div className="flex flex-col gap-5 w-[100%] md:w-[70%] lg:w-[75%] xl:w-[80%]">
            <div className="flex items-center justify-between h-[5vh] px-2">
              {/* left  */}
              <button
                className="flex items-center font-semibold gap-1 h-full border px-2 border-lightGray rounded-lg md:hidden"
                onClick={() => handleToggleFilter("show")}
              >
                F <RiMenuFold2Fill />
              </button>

              {/* right  */}
              <div className="h-full flex items-center">
                <select
                  type={"select"}
                  name={sort}
                  className="bg-transparent outline-none border-2 border-lightGray focus:border-blue rounded-lg w-full px-4 font-semibold text-xs h-full"
                  value={sort}
                  onChange={handleSortProduct}
                >
                  <option
                    value=""
                    className="capitalize text-xs font-semibold text-gray"
                  >
                    Select Sort
                  </option>

                  {product_sorting_data?.map((item, i) => (
                    <option
                      key={i}
                      className="capitalize text-xs font-semibold text-gray"
                      value={[item.key, item.value]}
                    >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 overflow-hidden">
              {!isLoading ? (
                productsData?.data?.products.length > 0 ? (
                  productsData?.data?.products?.map((item) => (
                    <ProductCard key={item._id} data={item} />
                  ))
                ) : (
                  "No Product Available"
                )
              ) : (
                <ProductCardLoader />
              )}
            </div>
            <Stack className="flex items-center justify-center" spacing={2}>
              <Page
                products={productsData?.data?.filteredProductsCount}
                resultPerPage={productsData?.data?.resultPerPage}
                page={parseInt(page)}
                handleSetPage={handleSetPage}
              />
            </Stack>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
