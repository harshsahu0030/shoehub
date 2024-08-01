import { useLayoutEffect, useState } from "react";
import * as Yup from "yup";
import BasicInput from "../components/inputs/BasicInput";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import useBackToTop from "../hook/useBackToTop";
import MetaData from "../utils/MetaData";

const Signin = () => {
  //states
  const [errors, setErrors] = useState({});
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });

  //errorHandling
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),

    password: Yup.string().required("Password is required"),
  });

  //functons
  const handleChange = (e) => {
    setSigninForm({ ...signinForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(signinForm, { abortEarly: false });
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
      setTimeout(() => {
        setErrors({});
      }, 5000);
    }
  };

  const backToTopHanlder = useBackToTop();
  useLayoutEffect(() => {
    backToTopHanlder();
  }, []);

  return (
    <>
      <MetaData
        title={`Shoehub | Signin`}
        description={`signin user`}
        keywords={`signin, login`}
      />
      <div className="h-full container flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-5 border border-lightGray rounded-lg mt-10 w-[90%] sm:w-[50%] lg:w-[40%] xl:w-[30%]"
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold">Sign In</h1>
            <h5 className="text-base font-semibold text-lightGray">
              Welcome Back to Shoehub
            </h5>
            <hr className="border-b-0 border-lightGray" />
          </div>

          <div className="flex flex-col gap-3">
            <BasicInput
              id={"signin-email"}
              label={"Your Email"}
              icon={MdOutlineMailOutline}
              type={"text"}
              name={"email"}
              placeholder="example01@gmail.com"
              value={signinForm.email}
              onChange={handleChange}
              error={errors.email}
            />

            <BasicInput
              id={"signin-password"}
              label={"Your Passwword"}
              icon={RiLockPasswordLine}
              type={"password"}
              name={"password"}
              placeholder="xyZ01@%"
              value={signinForm.password}
              onChange={handleChange}
              error={errors.password}
            />

            <Link
              to={"/forgot-password"}
              className="text-sm text-end font-medium text-blue"
            >
              forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="bg-blue text-white py-2 rounded-lg font-semibold transition-all ease-in-out duration-300 hover:bg-cyan"
          >
            Submit
          </button>

          <p className="text-sm font-medium">
            New to Shoehub?{" "}
            <Link to="/sign-up" className="text-blue">
              Sign up now
            </Link>
            .
          </p>

          <p className="text-sm font-medium">
            This page is protected by Google reCAPTCHA to ensure you are not a
            bot.
            <Link to={""} className="text-blue">
              {" "}
              Learn more
            </Link>
            .
          </p>
        </form>
      </div>
    </>
  );
};

export default Signin;
