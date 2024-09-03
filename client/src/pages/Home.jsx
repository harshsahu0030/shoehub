import { useLayoutEffect } from "react";
import HomeBanner from "../components/home/HomeBanner";
import HomeLeft from "../components/home/HomeLeft";
import HomeRight from "../components/home/HomeRight";
import ImageLoader from "../components/loaders/ImageLoader";
import { homeBanner } from "../data/banner";
import { homeData } from "../data/home";
import useBackToTop from "../hook/useBackToTop";
import MetaData from "../utils/MetaData";

const Home = () => {
  const backToTopHanlder = useBackToTop();

  useLayoutEffect(() => {
    backToTopHanlder();
  }, [backToTopHanlder]);
  return (
    <>
      <MetaData
        title={"Shoehub | Home"}
        description={"home page of shoehub"}
        keywords={
          "best sellers, hot products for this week, top rated, tending"
        }
      />

      <div className="flex flex-col gap-10 xl:gap-20">
        {/* banner  */}
        <div className="container flex gap-4">
          {/* left  */}
          <div className="h-full hidden md:block md:w-[30%] xl:w-[20%]"></div>

          {/* right  */}
          <div className="h-[25vh] md:h-[24vh] xl:h-[70vh] flex w-[100%] md:w-[70%] xl:w-[80%] rounded-lg overflow-hidden">
            {homeBanner ? (
              <HomeBanner data={homeBanner} />
            ) : (
              <div className="h-full w-[100%]">
                <ImageLoader />
              </div>
            )}
          </div>
        </div>

        {/* products  */}
        <div className="container flex flex-col-reverse md:flex-row gap-4">
          {/* left  */}
          <div className="w-[100%] md:w-[30%] xl:w-[20%]">
            <HomeLeft data={homeData} />
          </div>

          {/* right  */}
          <div className="flex w-[100%] md:w-[70%] xl:w-[80%]">
            <HomeRight data={homeData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
