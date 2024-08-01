import propTypes from "prop-types";
import HomeHeading from "./HomeHeading";
import ImageLoader from "../loaders/ImageLoader";
import BannerImage from "./BannerImage";
import ProductCardSwiper from "../productCardSwiper/ProductCardSwiper";

const HomeRight = ({ data }) => {
  const temp = [];

  return (
    <div className="container flex flex-col gap-5 overflow-hidden">
      {/* best seller  */}
      <HomeHeading
        title="Best"
        highlighted="Seller"
        description="Do not miss the current offers until the end of season."
        url=""
      />
      <div className="container">
        <ProductCardSwiper data={temp} />
      </div>

      {/* banner  */}
      <div className="md:h-[12vh] xl:h-[35vh] container flex gap-3 justify-between overflow-hidden">
        {data ? (
          data.banner.small
            .slice(0, 2)
            .map((item, i) => (
              <BannerImage key={i} img={item} imgAlt={"banner image"} />
            ))
        ) : (
          <ImageLoader number={2} />
        )}
      </div>

      {/* hot week product  */}
      <HomeHeading
        title="HOT PRODUCT FOR "
        highlighted="THIS WEEK"
        description="Dont miss this opportunity at a special discount just for this week."
        url=""
      />
      <div className="container">
        <ProductCardSwiper data={temp} />
      </div>

      {/* banner */}
      <div className="h-[12vh] xl:h-[35vh] container flex gap-3 justify-between overflow-hidden">
        {data ? (
          data.banner.small
            .slice(2, 4)
            .map((item, i) => (
              <BannerImage key={i} img={item} imgAlt={"banner image"} />
            ))
        ) : (
          <ImageLoader number={2} />
        )}
      </div>

      {/* top rated */}
      <HomeHeading
        title="top"
        highlighted="rated"
        description="New products with updated stocks."
        url=""
      />
      <div className="container">
        <ProductCardSwiper data={temp} />
      </div>

      {/* banner */}
      <div className="h-[6vh] xl:h-[20vh] container flex gap-3 justify-between overflow-hidden">
        {data ? (
          data.banner.horizontal.map((item, i) => (
            <BannerImage key={i} img={item} imgAlt={"banner image"} />
          ))
        ) : (
          <ImageLoader number={1} />
        )}
      </div>
    </div>
  );
};

HomeRight.propTypes = {
  data: propTypes.object,
};

export default HomeRight;
