import { Navigate, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";

export const Layout = () => {
  return (
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
        <Outlet />
      </main>
      <footer className="container mt-[20vh]">
        <Footer />
      </footer>
    </div>
  );
};

export const Authentication = () => {
  const isUser = false;

  if (!isUser) {
    return (
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
          <Outlet />
        </main>
        <footer className="container mt-[20vh]">
          <Footer />
        </footer>
      </div>
    );
  } else {
    return <Navigate to="/profile" />;
  }
};

export const AuthenticatedUser = () => {
  const isUser = false;

  if (isUser) {
    return (
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
          <Outlet />
        </main>
        <footer className="container mt-[20vh]">
          <Footer />
        </footer>
      </div>
    );
  } else {
    return <Navigate to="/sign-in" />;
  }
};
