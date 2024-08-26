import { useState } from "react";
import {
  categories,
  colorPallets,
  product_rating_data,
  products_discount,
} from "../data/category";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const Filters = () => {
  //states
  const [showColor, setShowColor] = useState(false);

  //functions

  return (
    <div className="container flex flex-col gap-3">
      <h3 className="text-lg font-bold">FILTERS</h3>

      <hr className="border-b-2 border-lightGray/30" />

      <div className="flex flex-col gap-3">
        <h4 className="text-medium font-bold">Select Gender</h4>
        <div className="flex flex-col gap-1">
          {categories.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input type="radio" name="gender" id="gender" />
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
          {categories[0].types.sort().map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="checkbox" name="categories" id="categories" />
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
              <input type="radio" name="discount" id="discount" />
              <label
                htmlFor="discount"
                className="capitalize text-base font-medium flex items-center"
              >
                {[...Array(5)].map((_, i) =>
                  item > i ? (
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
                  )
                )}
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
              <input type="radio" name="discount" id="discount" />
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
                <input type="checkbox" name="color" id="color" />
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

export default Filters;
