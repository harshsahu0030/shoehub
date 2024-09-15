import express from "express";
import {
  checkout,
  getRazorpayApiKey,
  paymentVerification,
} from "../controllers/paymentController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/razorpay/getkey").get(isAuthenticated, getRazorpayApiKey);

router.route("/checkout").post(isAuthenticated, checkout);

router.route("/paymentverification").post(isAuthenticated, paymentVerification);

export default router;
