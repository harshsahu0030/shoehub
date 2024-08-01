import Helmet from "react-helmet";
import propTypes from "prop-types";

const MetaData = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title ? title : "Shoehub"}</title>
      <meta
        name="description"
        content={description ? description.toLowerCase() : ""}
      />
      <meta name="keywords" content={keywords ? keywords.toLowerCase() : ""} />
    </Helmet>
  );
};

MetaData.propTypes = {
  title: propTypes.string,
  description: propTypes.string,
  keywords: propTypes.string,
};

export default MetaData;
