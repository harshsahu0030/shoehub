import propTypes from "prop-types";

const BannerImage = ({ img, imgAlt }) => {
  return (
    <img
      src={img}
      loading="lazy"
      alt={imgAlt}
      height={100}
      width={250}
      className="flex-1 rounded-lg overflow-hidden h-full object-cover cursor-pointer hover:opacity-80 border border-lightGray object-center"
    />
  );
};

BannerImage.propTypes = {
  img: propTypes.string,
  imgAlt: propTypes.string,
};

export default BannerImage;
