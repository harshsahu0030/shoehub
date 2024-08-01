import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import Image from "/error.png";
import useBackToTop from "../hook/useBackToTop";
import { useLayoutEffect } from "react";
import MetaData from "../utils/MetaData";

const Error = () => {
  const navigate = useNavigate();
  const backToTopHanlder = useBackToTop();

  useLayoutEffect(() => {
    backToTopHanlder();
  }, []);

  return (
    <>
      <MetaData
        title={"Shoehub | Page Not Found"}
        description={"Page Not Found in shoehub"}
        keywords={""}
      />
      <div className="h-full container px-2 md:px-4 lg:px-8 xl:px-16 2xl:px-32">
        <header className="container h-[6vh] hidden md:block">
          <Header />
        </header>
        <nav className="container h-[8vh] xl:h-[11vh] sticky top-0 left-0 z-20 bg-white">
          <Navbar />
        </nav>
        <main className="min-h-[80vh] flex flex-col mt-5 md:mt-0">
          <section className="container hidden md:block h-[6vh] xl:h-[12vh] py-3">
            <Menu />
          </section>
          <div className="h-full container flex justify-center items-center">
            <div className="flex flex-col items-center gap-5 mt-10">
              <img src={Image} alt="Error Image" height={100} width={200} />

              <div className="flex flex-col gap-2">
                <h1 className="text-3xl text-center">
                  We {"couldn't"} find any matches!
                </h1>

                <p className="text-md text-lightGray text-center font-medium">
                  Please check the spelling or try searching something else
                </p>
              </div>

              <button
                className="text-lg font-bold text-blue"
                onClick={() => navigate("/")}
              >
                Back To Home Page
              </button>
            </div>
          </div>
        </main>
        <footer className="container mt-[20vh]">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Error;
