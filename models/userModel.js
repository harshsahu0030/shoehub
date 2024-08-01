import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: [true, "please enter your name"],
      minLength: [3, "username must br of 3 characters"],
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: "Email address is required",
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },

    password: {
      type: String,
      trim: true,
      required: true,
      minLength: [5, "password must be at least 5 characters"],
      select: false,
    },

    role: {
      type: String,
      default: "users",
      required: true,
    },

    wishlist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "products",
        required: true,
      },
    ],

    cart: [
      {
        size: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.ObjectId,
          ref: "products",
        },
      },
    ],

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpire: {
      type: Date,
    },
  },

  { timestamps: true }
);

//hash password (using bcrypt)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//compare password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

//generate JWT token
userSchema.methods.generateJWTToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

export default mongoose.models.users || mongoose.model("users", userSchema);
