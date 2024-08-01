import UsersModel from "../models/userModel.js";
import RegisterOtpModel from "../models/registerOtpModel.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHanlder.js";
import { optGenerate } from "../utils/otpGenerate.js";
import { sendMail } from "../utils/serndMail.js";
import ApiResponse from "../utils/ApiResponse.js";
import crypto from "crypto";

//-----------------------------------------------------------------------------
//register user (without verification)
export const registerUserController = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(404, "All fields are required");
  }

  const existedUser = await UsersModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(400, "User already exists");
  }

  // email, subject, text
  const otpNumber = optGenerate();
  const subject = "Registration email Verification of Shoehub.";
  const text = `Registration Email Verification for Shoehub - ${otpNumber}. This is only valid for 30 minutes.`;

  //sending otp to email for verification
  await sendMail({
    email,
    subject,
    text,
  });

  // create register otp model for verification
  const otp = await RegisterOtpModel.create({
    ...req.body,
    otp: otpNumber,
    expire: new Date(Date.now() + 30 * 60 * 1000),
  });

  if (!otp) {
    throw new ApiError(400, "Something went wrong");
  }

  const otpId = otp._id;

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        otpId,
      },
      `Code sended to ${email}`
    )
  );
});

//-----------------------------------------------------------------------------
//registeratin user verfication
export const registerUserVerificationController = asyncHandler(
  async (req, res) => {
    const { id } = req.params;
    const { otp } = req.body;
    const otpModel = await RegisterOtpModel.findOne({ _id: id });

    if (!otpModel || parseInt(otpModel.expire) < Date.now()) {
      throw new ApiError(408, "Link expire. Please register again..");
    }

    if (!otp) {
      throw new ApiError(404, "please fill the OTP input");
    }

    if (parseInt(otpModel.otp) !== parseInt(otp)) {
      throw new ApiError(404, "Invalid OTP");
    }

    let user = await UsersModel.findOne({ email: otpModel.email });

    if (user) {
      return next(new ErrorHandler("User already exist.. please login", 400));
    }

    user = await UsersModel.create({
      username: otpModel.username,
      email: otpModel.email,
      password: otpModel.password,
    });

    // email, subject, text
    const subject = "Thank your for registering on Shoehub";
    const text = `Thank your ${otpModel.username} for registering on Shoehub`;

    //sending email
    await sendMail({ email: otpModel.email, subject, text });

    const token = await user.generateJWTToken();
    await otpModel.deleteOne();

    // options for cookie
    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("token", token, options)
      .json(
        new ApiResponse(
          200,
          {
            user,
            token,
          },
          `Welcome! ${user.username}`
        )
      );
  }
);

//-----------------------------------------------------------------------------
//resend register user verification otp
export const resendRegisterUserVerificationOtpController = asyncHandler(
  async (req, res) => {
    const otpModel = await RegisterOtpModel.findById(req.params.id);

    if (!otpModel) {
      return next(
        new ErrorHandler("Request Error! please register again", 400)
      );
    }

    if (!otpModel || parseInt(otpModel.expire) < Date.now()) {
      throw new ApiError(408, "Link expire. Please register again..");
    }

    // email, subject, text
    const subject = "Registration email Verification of Shoehub.";
    const text = `Registration Email Verification for Shoehub - ${otpModel.otp}. This is only valid for 30 minutes.`;

    //sending email
    await sendMail({ email: otpModel.email, subject, text });

    return res
      .status(200)
      .json(new ApiResponse(200, null, `Code sended to ${otpModel.email}`));
  }
);

//-----------------------------------------------------------------------------
//login user
export const loginUserController = asyncHandler(async (req, res) => {
  const { input, password } = req.body;

  if (!input || !password) {
    throw new ApiError(404, "All fields are required");
  }

  const user = await UsersModel.findOne({
    $or: [{ email: input }, { username: input }],
  }).select("+password");

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const token = await user.generateJWTToken();

  // options for cookie
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("token", token, options)
    .json(
      new ApiResponse(
        200,
        {
          user,
          token,
        },
        `Welcome Back! ${user.username}`
      )
    );
});

//-----------------------------------------------------------------------------
//load user
export const loadUserController = asyncHandler(async (req, res) => {
  const user = await UsersModel.findById(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, user, `welcome back! ${user.username}`));
});

//-----------------------------------------------------------------------------
//logout user
export const logoutUserController = asyncHandler(async (req, res) => {
  const user = await UsersModel.findById(req.user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("token", options)
    .json(new ApiResponse(200, null, `See you Again! ${user.username}`));
});

//-----------------------------------------------------------------------------
//update user password
export const updateUserPasswordController = asyncHandler(async (req, res) => {
  const user = await UsersModel.findById(req.user._id).select("+password");

  if (!user) {
    throw new ApiError(400, "User not found");
  }
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    throw new ApiError(404, "All fields are required");
  }

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid old password");
  }

  if (newPassword !== confirmPassword) {
    throw new ApiError(404, "new and confirm password don't match");
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json(new ApiResponse(200, null, `password updated`));
});

//-----------------------------------------------------------------------------
//update user profile
export const updateUserProfileController = asyncHandler(async (req, res) => {
  const user = await UsersModel.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, null, `profile updated`));
});

//-----------------------------------------------------------------------------
//forgot user password
export const forgotUserPasswordController = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(404, "Please enter the email");
  }

  const user = await UsersModel.findOne({ email }).select(
    "+resetPasswordOtp +resetPasswordOtpExpire"
  );

  if (!user) {
    throw new ApiError(400, "User not found with this email");
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();
  await user.save();

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  // email, subject, text
  const subject = "Forgot password of Shoehub.";
  const text = `Forgot password fof Shoehub. This link is only valid for 30 minutes. - ${resetPasswordUrl}`;

  //sending otp to email for verification
  await sendMail({
    email,
    subject,
    text,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, `Code sended to ${user.email}`));
});

//reset user password
export const resetUserPasswordController = asyncHandler(async (req, res) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await UsersModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(
      400,
      "Reset Password Token is invalid or has been expired"
    );
  }

  const { newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    throw new ApiError(400, "new and confirm password don't match");
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, null, `Password has been reset. Please login`));
});

//-----------------------------------------------------------------------------
//admin controllers

//find all users
export const findAllUsersController = asyncHandler(async (req, res) => {
  const users = await UsersModel.find();

  return res.status(200).json(new ApiResponse(200, users, null));
});

//find user
export const findUserController = asyncHandler(async (req, res) => {
  const user = await UsersModel.findById(req.params.id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  return res.status(200).json(new ApiResponse(200, user, null));
});

//update user role
export const updateUserRoleController = asyncHandler(async (req, res) => {
  const user = await UsersModel.findById(req.params.id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const { email, username, role } = req.body;

  await UsersModel.findByIdAndUpdate(
    req.params.id,
    {
      email,
      username,
      role,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  return res.status(200).json(new ApiResponse(200, user, "User role updated"));
});

//delete user
export const deleteUserRoleController = asyncHandler(async (req, res) => {
  const user = await UsersModel.findById(req.params.id);

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  await user.deleteOne();

  return res.status(200).json(new ApiResponse(200, null, "User deleted"));
});
