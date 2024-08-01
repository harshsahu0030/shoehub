import propTypes from "prop-types";
import { IoStarOutline, IoStar, IoStarHalf } from "react-icons/io5";

const ProductDetails = ({ product }) => {
  const { brand, title, mrp, price, discount, sizes, ratings, numOfReviews } =
    product;
  return (
    product && (
      <div className="flex flex-col gap-5">
        {/* heading  */}
        <div className="flex flex-col gap-1">
          <h4 className="text-lg font-bold uppercase">{brand}</h4>
          <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>
        </div>

        {/* category  */}
        <div className="flex gap-3 text-lg items-center">
          <div className="flex items-center text-blue text-lg ">
            {[...Array(5)].map((_, i) => {
              i += 1;

              return i <= ratings ? (
                <IoStar key={i} size={20} />
              ) : i - 1 < ratings ? (
                <IoStarHalf key={i} size={20} />
              ) : (
                <IoStarOutline key={i} size={20} />
              );
            })}
          </div>

          <span className="font-semibold text-base">({ratings}/5)</span>
          <span className="font-semibold text-base text-gray">
            {numOfReviews} reviews
          </span>
        </div>

        <hr className="border-b border-lightGray/30" />

        {/* price  */}
        <div className="flex gap-5 items-center">
          <span className="text-4xl font-bold">₹{price}</span>
          <span className="text-2xl line-through font-semibold text-gray">
            ₹{mrp}
          </span>
          <span className="text-lg font-semibold text-red-600">
            ( {discount} OFF% )
          </span>
        </div>

        <hr className="border-b border-lightGray/30" />

        {/* sizes  */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            <h4 className="text-lg font-semibold">Available Size</h4>
            <div className="flex flex-wrap gap-3">
              {sizes?.map((item, i) => (
                <button
                  key={i}
                  className="text-lg flex items-center justify-center font-medium h-14 w-14 border rounded-lg border-lightGray hover:bg-blue hover:text-white transition-all ease-in-out duration-200"
                >
                  {item.size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <hr className="border-b border-lightGray/30" />

        {/* button */}
        <div className="grid grid-cols-2 gap-3 text-sm md:text-lg font-semibold">
          <button className="w-ful0l py-3 bg-blue text-white rounded-md hover:bg-blue/80  border-2 border-lightGray transition-all ease-in-out duration-150">
            ADD TO CART
          </button>
          <button className="w-full py-3 border-2 border-lightGray rounded-md hover:bg-lightGray/30  transition-all ease-in-out duration-150">
            ADD TO WISHLIST
          </button>
        </div>
      </div>
    )
  );
};

ProductDetails.propTypes = {
  product: propTypes.object,
};
export default ProductDetails;
