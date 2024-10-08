import { RiLockPasswordLine } from "react-icons/ri";
import BasicInput from "../components/inputs/BasicInput";
import MetaData from "../utils/MetaData";
import { useLayoutEffect, useState } from "react";
import * as Yup from "yup";
import useBackToTop from "../hook/useBackToTop";

const UpdatePassword = () => {
  const backToTopHanlder = useBackToTop();

  //states
  const [errors, setErrors] = useState({});
  const [updatePassword, setUpdatePassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  //errorHandling
  const validationSchema = Yup.object({
    newPassword: Yup.string()
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
    setUpdatePassword({ ...updatePassword, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(updatePassword, { abortEarly: false });
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
  }, [backToTopHanlder]);

  return (
    <>
      <MetaData
        title={`Shoehub | Update password`}
        description={`update or change password of user`}
        keywords={`change password, update password, reset password`}
      />
      <div className="h-full container flex justify-center items-center">
        <form
          className="flex flex-col gap-5 p-5 border border-lightGray rounded-lg mt-10 w-[90%] sm:w-[50%] lg:w-[40%] xl:w-[30%]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold">Update Password</h1>
            <h5 className="text-base font-semibold text-lightGray">
              Update you password
            </h5>
            <hr className="border-b-0 border-lightGray" />
          </div>

          <div className="flex flex-col gap-3">
            <BasicInput
              id={"updatePassword-oldPassword"}
              label={"Old Password"}
              icon={RiLockPasswordLine}
              type={"password"}
              name={"oldPassword"}
              placeholder="xyZ01@%"
              value={updatePassword.oldPassword}
              onChange={handleChange}
              error={errors.oldPassword}
            />
            <BasicInput
              id={"updatePassword-newPassword"}
              label={"New Password"}
              icon={RiLockPasswordLine}
              type={"password"}
              name={"newPassword"}
              placeholder="xyZ01@%"
              value={updatePassword.newPassword}
              onChange={handleChange}
              error={errors.newPassword}
            />
            <BasicInput
              id={"updatePassword-confirmPassword"}
              label={"Confirm Password"}
              icon={RiLockPasswordLine}
              type={"password"}
              name={"confirmPassword"}
              placeholder="xyZ01@%"
              value={updatePassword.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
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

export default UpdatePassword;
