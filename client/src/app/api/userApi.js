import axios from "axios";

//register user
export const registerUserApi = async (signUpForm) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(`/api/v1/register`, signUpForm, config);
  return data;
};

//register user verification
export const registerUserVerificationApi = async ({ otpid, otp }) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(
    `/api/v1/register/verification/${otpid}`,
    { otp },
    config
  );
  return data;
};

//register user verification
export const registerUserVerificationResendOtpApi = async (otpId) => {
  const { data } = await axios.get(
    `/api/v1/register/verification/code-resend/${otpId}`
  );
  return data;
};

//login user
export const loginUserApi = async (signinForm) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(`/api/v1/login`, signinForm, config);
  return data;
};

//forgot password  user
export const forgotPasswordUserApi = async (forgotPasswordForm) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.post(
    `/api/v1/forgot/password`,
    forgotPasswordForm,
    config
  );
  return data;
};

//reset password  user
export const resetPasswordUserApi = async ({ resetPassword, token }) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const { data } = await axios.put(
    `/api/v1/reset/password/${token}`,
    resetPassword,
    config
  );
  return data;
};

//load user
export const loadUserApi = async () => {
  const { data } = await axios.get(`/api/v1/load`);
  return data;
};

//logout user
export const logoutUserApi = async () => {
  const { data } = await axios.get(`/api/v1/logout`);
  return data;
};
