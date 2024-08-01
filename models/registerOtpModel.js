import mongoose from "mongoose";

const redisterOtpModel = new mongoose.Schema(
  {
    otp: {
      type: Number,
      requred: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    expire: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("registerOtp", redisterOtpModel);
