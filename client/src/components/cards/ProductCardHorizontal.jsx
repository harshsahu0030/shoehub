import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ProductCardHorizontal = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex gap-2 h-[18vh] md:h-[11vh] xl:h-[15vh] border border-lightGray/30 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-lightGray-500/50"
      onClick={() =>
        navigate(
          `/products/${data.gender.toLowerCase()}/${data.category.toLowerCase()}/${
            data._id
          }`
        )
      }
    >
      {/* top  */}
      <div className="h-full flex items-center w-[40%] bg-white">
        <img
          src={data.images[0].url}
          alt="product image"
          loading="lazy"
          className="w-full object-contain"
        />
      </div>

      {/* bottom  */}
      <div className="flex flex-col justify-center gap-2 h-full w-[60%] text-xs">
        <div className="flex flex-col">
          <h5 className="uppercase font-bold line-clamp-1">{data.brand}</h5>
          <p className="line-clamp-2 font-medium">{data.title}</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-base font-bold">
            {" "}
            {data.price.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "INR",
            })}
          </span>
          <span className="text-xs line-through font-bold text-lightGray">
            {data.mrp.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "INR",
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

ProductCardHorizontal.propTypes = {
  data: propTypes.object,
};

export default ProductCardHorizontal;
