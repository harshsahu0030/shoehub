import { useEffect, useState } from "react";
import {
  all_category,
  categories,
  colorPallets,
  product_rating_data,
  products_discount,
} from "../data/category";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import propTypes from "prop-types";

const Filters = ({
  gender,
  setGender,
  category,
  setCategory,
  categoryArr,
  setCategoryArr,
  lPrice,
  setLPrice,
  hPrice,
  setHPrice,
  lRating,
  setLRating,
  color,
  setColor,
  discount,
  setDiscount,
  page,
  setPage,
  refetch,
}) => {
  //states
  let [searchParams, setSearchParams] = useSearchParams();
  const [showColor, setShowColor] = useState(false);

  //functions
  const handleChangeGender = async (e) => {
    setGender(e.target.value);
    setCategoryArr(
      categories.find((cat) => cat.gender === e.target.value).types
    );
    setPage(1);
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
  };

  const handleChangePrice = async (e) => {
    setLRating(e.target.value);
    setPage(1);
  };

  const handleChangeRatings = async (e) => {
    setLRating(e.target.value);
    setPage(1);
  };

  const handleChangeDiscount = async (e) => {
    setDiscount(e.target.value);
    setPage(1);
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
  };

  useEffect(() => {
    setSearchParams(
      `?${gender !== "" ? `&g=${gender}` : ""}${
        category && category.length > 0 ? `&cat=${category?.join(" ")}` : ""
      }${lRating ? `&ratl=${lRating}` : ""}${
        discount ? `&dis=${discount}` : ""
      }${color && color.length > 0 ? `&col=${color?.join(" ")}` : ""}${
        page !== "" ? `&p=${page}` : ""
      }`
    );
  }, [
    setSearchParams,
    gender,
    category,
    lRating,
    color,
    discount,
    page,
    refetch,
  ]);

  return (
    <div className="container flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">FILTERS</h3>
        <button
          className="text-sm font-semibold bg-red-500 text-white py-1 px-2 rounded-lg"
          onClick={() => {
            setGender("");
            setCategory([]);
            setLRating("");
            setDiscount("");
            setColor("");
          }}
        >
          Reset
        </button>
      </div>

      <hr className="border-b-2 border-lightGray/30" />

      <div className="flex flex-col gap-3">
        <h4 className="text-medium font-bold">Select Gender</h4>
        <div className="flex flex-col gap-1">
          {categories.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="radio"
                name="gender"
                id="gender"
                checked={gender === item.gender}
                value={item.gender}
                onChange={handleChangeGender}
              />
              <label
                htmlFor="gender"
                className="capitalize text-base font-medium"
              >
                {item.gender}
              </label>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-b-2 border-lightGray/30" />

      <div className="flex flex-col gap-3">
        <h4 className="text-medium font-bold">Select Categories</h4>
        <div className="flex flex-col gap-1">
          {gender !== ""
            ? categoryArr &&
              categoryArr.sort().map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="categories"
                    id="categories"
                    checked={category.includes(item)}
                    value={item}
                    onChange={handleChangeCategory}
                  />
                  <label
                    htmlFor="categories"
                    className="capitalize text-base font-medium"
                  >
                    {item}
                  </label>
                </div>
              ))
            : all_category.types.sort().map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="categories"
                    id="categories"
                    value={item}
                    onChange={handleChangeCategory}
                  />
                  <label
                    htmlFor="categories"
                    className="capitalize text-base font-medium"
                  >
                    {item}
                  </label>
                </div>
              ))}
        </div>
      </div>

      <hr className="border-b-2 border-lightGray/30" />

      <div className="flex flex-col gap-3">
        <h4 className="text-medium font-bold">Select Ratings</h4>
        <div className="flex flex-col gap-1">
          {product_rating_data.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="radio"
                name="rating"
                id="rating"
                checked={item == lRating}
                value={item}
                onChange={handleChangeRatings}
              />
              <label
                htmlFor="rating"
                className="capitalize text-base font-medium flex items-center"
              >
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center">
                    {item > i ? (
                      <>
                        <IoIosStar
                          key={i}
                          height={30}
                          width={30}
                          className="text-blue text-lg"
                        />
                      </>
                    ) : (
                      <>
                        <IoIosStarOutline
                          key={i}
                          height={30}
                          width={30}
                          className="text-lg"
                        />
                      </>
                    )}
                  </div>
                ))}

                <span className="pl-1">& Above</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-b-2 border-lightGray/30" />

      <div className="flex flex-col gap-3">
        <h4 className="text-medium font-bold">Select Discount</h4>
        <div className="flex flex-col gap-1">
          {products_discount.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input
                type="radio"
                name="discount"
                id="discount"
                checked={item.value == discount}
                value={item.value}
                onChange={handleChangeDiscount}
              />
              <label
                htmlFor="discount"
                className="capitalize text-base font-medium"
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-b-2 border-lightGray/30" />

      <div className="flex flex-col gap-3">
        <h4 className="text-medium font-bold">Select Colours</h4>
        <div className="flex flex-col gap-1">
          {colorPallets
            .slice(0, showColor ? colorPallets.length : 10)
            .map((item, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="checkbox"
                  name="color"
                  id="color"
                  checked={color.includes(item.name)}
                  value={item.name}
                  onChange={handleChangeColor}
                />
                <label
                  htmlFor="color"
                  className="capitalize text-base font-medium"
                >
                  {item.name}
                </label>
              </div>
            ))}

          <button
            className="flex text-blue items-center capitalize text-base font-medium"
            onClick={() => setShowColor((prev) => !prev)}
          >
            {showColor ? (
              <>
                See Less <IoIosArrowUp />
              </>
            ) : (
              <>
                See More`
                <IoIosArrowDown />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

Filters.propTypes = {
  gender: propTypes.string,
  setGender: propTypes.func,
  category: propTypes.array,
  setCategory: propTypes.func,
  categoryArr: propTypes.array,
  setCategoryArr: propTypes.func,
  lPrice: propTypes.string,
  setLPrice: propTypes.func,
  hPrice: propTypes.string,
  setHPrice: propTypes.func,
  lRating: propTypes.string,
  setLRating: propTypes.func,
  color: propTypes.array,
  setColor: propTypes.func,
  discount: propTypes.string,
  setDiscount: propTypes.func,
  page: propTypes.string,
  setPage: propTypes.func,
  refetch: propTypes.func,
};

export default Filters;
