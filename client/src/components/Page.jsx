import Pagination from "@mui/material/Pagination";
import propTypes from "prop-types";

const Page = ({ products, resultPerPage, page, setPage }) => {
  return (
    <Pagination
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      page={page}
      count={Math.ceil(products / resultPerPage)}
      onChange={(_, value) => setPage(value)}
      variant="outlined"
      color="primary"
    />
  );
};

Page.propTypes = {
  products: propTypes.number,
  page: propTypes.number,
  setPage: propTypes.func,
  resultPerPage: propTypes.string,
};

export default Page;
