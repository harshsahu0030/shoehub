import { useLayoutEffect } from "react";
import useBackToTop from "../hook/useBackToTop";
import MetaData from "../utils/MetaData";

const Search = () => {
  const backToTopHanlder = useBackToTop();
  useLayoutEffect(() => {
    backToTopHanlder();
  }, [backToTopHanlder]);
  return (
    <>
      <MetaData
        title={`Shoehub | Search`}
        description={`Search products`}
        keywords={`search, find`}
      />
      <div>Search</div>
    </>
  );
};

export default Search;
