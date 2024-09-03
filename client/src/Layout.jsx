import { Navigate, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/Admin/AdminNavbar";
import { useContext, useEffect, useLayoutEffect } from "react";
import { AuthContext } from "./context/Authuser";
import Loader from "./components/loaders/Loader";

export const Layout = () => {
  return (
    <div className="h-full container px-2 md:px-4 lg:px-8 xl:px-16 2xl:px-32">
      <header className="container h-[6vh] hidden md:block">
        <Header />
      </header>
      <nav className="container h-[8vh] xl:h-[11vh] sticky top-0 left-0 z-20 bg-white">
        <Navbar />
      </nav>
      <main className="min-h-[80vh] flex flex-col mt-5 md:mt-0 gap-5">
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
  const { isUser, isLoading } = useContext(AuthContext);

  if (!isLoading) {
    if (!isUser) {
      return (
        <div className="h-full container px-2 md:px-4 lg:px-8 xl:px-16 2xl:px-32">
          <header className="container h-[6vh] hidden md:block">
            <Header />
          </header>
          <nav className="container h-[8vh] xl:h-[11vh] sticky top-0 left-0 z-20 bg-white">
            <Navbar />
          </nav>
          <main className="min-h-[80vh] flex flex-col mt-5 md:mt-0 gap-5">
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
  } else {
    return <Loader />;
  }
};

export const AuthenticatedUser = () => {
  const { isUser, isLoading } = useContext(AuthContext);

  if (!isLoading) {
    if (isUser) {
      return (
        <div className="h-full container px-2 md:px-4 lg:px-8 xl:px-16 2xl:px-32">
          <header className="container h-[6vh] hidden md:block">
            <Header />
          </header>
          <nav className="container h-[8vh] xl:h-[11vh] sticky top-0 left-0 z-20 bg-white">
            <Navbar />
          </nav>
          <main className="min-h-[80vh] flex flex-col mt-5 md:mt-0 gap-5">
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
  } else {
    return <Loader />;
  }
};

export const AdminUser = () => {
  const { currentUser, isLoading, refetch } = useContext(AuthContext);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!isLoading) {
    if (currentUser.role === "admin") {
      return (
        <div className="flex flex-col gap-3 h-[100vh] container px-2 lg:px-4 xl:px-8 2xl:px-16 bg-slate-800">
          <nav className="container h-[8vh] xl:h-[11vh] sticky top-0 left-0 z-20 bg-slate-900 rounded-lg mt-2">
            <AdminNavbar />
          </nav>
          <main className="h-[92vh] xl:h-[89vh] flex flex-col mb-2">
            <Outlet />
          </main>
        </div>
      );
    } else {
      return <Navigate to="/sign-in" />;
    }
  } else {
    return <Loader />;
  }
};
