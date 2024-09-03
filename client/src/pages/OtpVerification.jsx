import { useEffect, useLayoutEffect, useState } from "react";
import * as Yup from "yup";
import BasicInput from "../components/inputs/BasicInput";
import useBackToTop from "../hook/useBackToTop";
import MetaData from "../utils/MetaData";
import { MdOutlineVerifiedUser } from "react-icons/md";
import {
  registerUserVerificationApi,
  registerUserVerificationResendOtpApi,
} from "../app/api/userApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const OtpVerification = () => {
  const backToTopHanlder = useBackToTop();
  const navigate = useNavigate();
  const { otpid } = useParams();

  //states
  const [errors, setErrors] = useState({});
  const [otpForm, setOtpForm] = useState({
    otp: "",
  });

  //errorHandling
  const validationSchema = Yup.object({
    otp: Yup.number().required(),
  });

  //react quires
  const { mutate, isPending } = useMutation({
    mutationFn: registerUserVerificationApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate(`/`);
    },
  });

  const { isError, isSuccess, data, error, refetch } = useQuery({
    queryKey: ["resend-verification"],
    queryFn: () => registerUserVerificationResendOtpApi(otpid),
    enabled: false,
  });

  //functons
  const handleChange = (e) => {
    setOtpForm({
      ...otpForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(otpForm, {
        abortEarly: false,
      });

      mutate({ ...otpForm, otpid });
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

  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
    if (isSuccess) {
      toast.success(data.message);
    }
  }, [isError, isSuccess, data, error]);

  useLayoutEffect(() => {
    backToTopHanlder();
  }, [backToTopHanlder]);

  return (
    <>
      <MetaData
        title={`Shoehub | Otp Verification`}
        description={`otp verification`}
        keywords={`otp, otp verification`}
      />
      <div className="h-full container flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-5 border border-lightGray rounded-lg mt-10 w-[90%] sm:w-[50%] lg:w-[40%] xl:w-[30%]"
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold">OTP Verification</h1>
            <h5 className="text-base font-semibold text-lightGray">
              {"Enter ypur otp to verify yourself"}
            </h5>
            <hr className="border-b-0 border-lightGray" />
          </div>

          <div className="flex flex-col gap-3">
            <BasicInput
              id={"otp-verification-number"}
              label={"enter OTP"}
              icon={MdOutlineVerifiedUser}
              type={"number"}
              name={"otp"}
              placeholder="0123"
              value={otpForm.otp}
              onChange={handleChange}
              error={errors.otp}
            />
            <button
              type="button"
              className="text-sm text-end font-medium text-blue"
              onClick={() => refetch()}
            >
              resend otp?
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue text-white py-2 rounded-lg font-semibold transition-all ease-in-out duration-300 hover:bg-cyan disabled:bg-lightGray"
            disabled={isPending}
          >
            {isPending ? "loading" : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default OtpVerification;
