import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { AdminUser, AuthenticatedUser, Authentication, Layout } from "./Layout";
import { lazy } from "react";
import Error from "./pages/Error.jsx";
import Loader from "./components/loaders/Loader.jsx";
import OtpVerification from "./pages/OtpVerification.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import AdminProducts from "./pages/Admin/AdminProducts.jsx";
import AdminOrders from "./pages/Admin/AdminOrders.jsx";
import AdminUsers from "./pages/Admin/AdminUsers.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import CreateProduct from "./pages/Admin/CreateProduct.jsx";
import AdminError from "./pages/Admin/AdminError.jsx";
import UpdateProducts from "./pages/Admin/UpdateProducts.jsx";

//routes import
const Home = lazy(() => import("./pages/Home.jsx"));
const Products = lazy(() => import("./pages/Products.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Signin = lazy(() => import("./pages/Signin.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Wishlist = lazy(() => import("./pages/Wishlist.jsx"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword.jsx"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword.jsx"));
const ResetPassword = lazy(() => import("./pages/ResetPassword.jsx"));

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error />,
      lazy,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "products/:gender",
          element: <Products />,
        },
        {
          path: "products/:gender/:category",
          element: <Products />,
        },
        {
          path: "products/:gender/:category/:id",
          element: <Product />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },
    {
      path: "/",
      element: <Authentication />,
      errorElement: <Error />,
      lazy,
      children: [
        {
          path: "sign-in",
          element: <Signin />,
        },
        {
          path: "sign-up",
          element: <Signup />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password/:token",
          element: <ResetPassword />,
        },
        {
          path: "otp-verification/:otpid",
          element: <OtpVerification />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthenticatedUser />,
      errorElement: <Error />,
      lazy,
      children: [
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "wishlist",
          element: <Wishlist />,
        },
        {
          path: "update-password",
          element: <UpdatePassword />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminUser />,
      errorElement: <AdminError />,
      lazy,
      children: [
        {
          path: "",
          element: <Admin />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "products",
          element: <AdminProducts />,
        },
        {
          path: "products/create",
          element: <CreateProduct />,
        },
        {
          path: "products/:id",
          element: <UpdateProducts />,
        },
        {
          path: "orders",
          element: <AdminOrders />,
        },
        {
          path: "users",
          element: <AdminUsers />,
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
