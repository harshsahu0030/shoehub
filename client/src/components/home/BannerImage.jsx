import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const BannerImage = ({ img, imgAlt, url }) => {
  const navigate = useNavigate();

  return (
    <img
      src={img}
      loading="lazy"
      alt={imgAlt}
      height={100}
      width={250}
      className="flex-1 rounded-lg overflow-hidden h-full object-cover cursor-pointer hover:opacity-80 border border-lightGray object-center"
      onClick={() =>
        navigate(
          `${url.url}?${url.query.gender ? `&g=${url.query.gender}` : ""}${
            url.query.category ? `&cat=${url.query.category?.join(" ")}` : ""
          }${url.query.discount ? `&dis=${url.query.discount}` : ""}${
            url.query.color ? `&col=${url.query.color?.join(" ")}` : ""
          }`
        )
      }
    />
  );
};

BannerImage.propTypes = {
  img: propTypes.string,
  imgAlt: propTypes.string,
  url: propTypes.object,
};

export default BannerImage;
