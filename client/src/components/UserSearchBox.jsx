import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import { getSearchProductsApi } from "../app/api/productApi";
import toast from "react-hot-toast";
import ProductCardLoader from "./loaders/ProductCardHorizontalLoader";
import { useNavigate, useSearchParams } from "react-router-dom";

const UserSearchBox = () => {
  const navigate = useNavigate();

  //states
  const [userSearch, setUserSearch] = useState("");
  const [showSearchResult, setShowSearchResult] = useState(false);

  //react-queries
  const {
    isError,
    data: productsData,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-search-products"],
    queryFn: () => getSearchProductsApi(userSearch),
  });

  //function
  const handleChange = (e) => {
    setUserSearch(e.target.value);
    refetch();
  };

  //useFeffcet
  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isError, error]);

  return (
    <div className="h-full w-full relative">
      <div className="container flex justify-between items-center h-full">
        <input
          type="text"
          name="search"
          placeholder="search..."
          value={userSearch}
          onChange={handleChange}
          className="container h-full outline-none border-2 border-lightGray bg-transparent pl-4 pr-20 bg-slate-200 rounded-lg transition-all duration-200 ease-in-out focus:border-cyan text-lg font-medium"
          onFocus={() => {
            setShowSearchResult(true);
          }}
          onBlur={() => {
            setShowSearchResult(false);
            refetch();
            // setUserSearch("");
          }}
        />
        <RiSearch2Line
          className="absolute right-5 text-2xl cursor-pointer transition-all duration-200 ease-in-out hover:scale-110"
          height={50}
          width={50}
          onClick={() => navigate(`/products?keyword=${userSearch}`)}
        />
      </div>

      {showSearchResult && (
        <ul className="absolute top-[100%]  w-full left-0 h-[60vh] bg-white p-4 rounded-md shadow-lg shadow-lightGray-500/50 overflow-y-scroll flex flex-col gap-3">
          {!isLoading ? (
            productsData?.data?.products.length > 0 ? (
              productsData?.data?.products.map((item) => (
                <li
                  key={item._id}
                  className="flex gap-2 h-[8vh] xl:h-[10vh] bg-lightGray/10 hover:shadow-lg hover:shadow-lightGray-500/50 hover:scale-105 transition-all ease-in-out duration-200 cursor-pointer"
                >
                  {/* left */}
                  <div className="w-[20%] flex justify-center bg-lightGray/10">
                    <img
                      src={item.images[0].url}
                      alt="img"
                      className="h-full object-contain"
                    />
                  </div>

                  {/* right  */}
                  <div className="w-[80%] py-1 flex flex-col">
                    <p className="font-bold text-gray text-xs">{item.brand}</p>
                    <p className="line-clamp-1 text-sm">{item.title}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="flex gap-2 h-[8vh] xl:h-[10vh] w-full">
                No Product Found...
              </li>
            )
          ) : (
            <ProductCardLoader />
          )}
        </ul>
      )}
    </div>
  );
};

export default UserSearchBox;
