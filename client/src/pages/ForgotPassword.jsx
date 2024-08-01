import { useLayoutEffect, useState } from "react";
import * as Yup from "yup";
import BasicInput from "../components/inputs/BasicInput";
import { MdOutlineMailOutline } from "react-icons/md";
import useBackToTop from "../hook/useBackToTop";
import MetaData from "../utils/MetaData";

const ForgotPassword = () => {
  //states
  const [errors, setErrors] = useState({});
  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: "",
  });

  //errorHandling
  const validationSchema = Yup.object({
    email: Yup.string().required("Email is Required"),
  });

  //functons
  const handleChange = (e) => {
    setForgotPasswordForm({
      ...forgotPasswordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(forgotPasswordForm, {
        abortEarly: false,
      });
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
            <h1 className="text-3xl font-semibold">Forgot Password</h1>
            <h5 className="text-base font-semibold text-lightGray">
              {"Enter you email, we'll send you a reset password link"}
            </h5>
            <hr className="border-b-0 border-lightGray" />
          </div>

          <div className="flex flex-col gap-3">
            <BasicInput
              id={"forgot-password-email"}
              label={"Your Email"}
              icon={MdOutlineMailOutline}
              type={"text"}
              name={"email"}
              placeholder="example01@gmail.com"
              value={forgotPasswordForm.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>

          <button
            type="submit"
            className="bg-blue text-white py-2 rounded-lg font-semibold transition-all ease-in-out duration-300 hover:bg-cyan"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
