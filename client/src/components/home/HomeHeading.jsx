import RoundedButton from "../buttons/RoundedButton";
import propTypes from "prop-types";

const HomeHeading = ({ title, highlighted, description, url }) => {
  return (
    <div className="container flex flex-col md:flex-row justify-between md:items-center gap-3 md:gap-5">
      {/* left  */}
      <div className="flex flex-col">
        <h2 className="md:text-xl xl:text-3xl font-bold uppercase">
          {title && title}{" "}
          <span className="text-red-600">{highlighted && highlighted}</span>
        </h2>
        <span className="text-xs lg:text-base font-semibold text-lightGray">
          {description && description}
        </span>
      </div>
      {/* right  */}
      <RoundedButton url={url && url} />
    </div>
  );
};

HomeHeading.propTypes = {
  title: propTypes.string,
  highlighted: propTypes.string,
  description: propTypes.string,
  url: propTypes.string,
};

export default HomeHeading;
