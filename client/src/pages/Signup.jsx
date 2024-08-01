import { useLayoutEffect, useState } from "react";
import * as Yup from "yup";
import BasicInput from "../components/inputs/BasicInput";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { AiOutlineUser } from "react-icons/ai";

import { Link } from "react-router-dom";
import useBackToTop from "../hook/useBackToTop";
import MetaData from "../utils/MetaData";

const Signup = () => {
  const backToTopHanlder = useBackToTop();
  //states
  const [errors, setErrors] = useState({});
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  //errorHandling
  const validationSchema = Yup.object({
    username: Yup.string()
      .matches(/^(\S+$)/g, "* This field cannot contain only blankspaces")
      .min(3, "* Username must be at least 3 characters")
      .required("Username is Required"),

    email: Yup.string().required("Email is Required"),

    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  });

  //functons
  const handleChange = (e) => {
    setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(signUpForm, { abortEarly: false });
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };
  
  useLayoutEffect(() => {
    backToTopHanlder();
  }, []);

  return (
    <>
      <MetaData
        title={`Shoehub | Signup`}
        description={`signup user`}
        keywords={`signup, register`}
      />
      <div className="h-full container flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-5 border border-lightGray rounded-lg mt-10 w-[90%] sm:w-[50%] lg:w-[40%] xl:w-[30%]"
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold">Sign Up</h1>
            <h5 className="text-base font-semibold text-lightGray">
              Welcome to Shoehub
            </h5>
            <hr className="border-b-0 border-lightGray" />
          </div>

          <div className="flex flex-col gap-3">
            <BasicInput
              id={"signin-username"}
              label={"Your Username"}
              icon={AiOutlineUser}
              type={"text"}
              name={"username"}
              placeholder="example01"
              value={signUpForm.username}
              onChange={handleChange}
              error={errors.username}
            />
            <BasicInput
              id={"signin-email"}
              label={"Your Email"}
              icon={MdOutlineMailOutline}
              type={"text"}
              name={"email"}
              placeholder="example01@gmail.com"
              value={signUpForm.email}
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
              value={signUpForm.password}
              onChange={handleChange}
              error={errors.password}
            />

            <Link to={""} className="text-sm text-end font-medium text-blue">
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
            Already have account?{" "}
            <Link to="/sign-in" className="text-blue">
              Sign in now
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

export default Signup;
