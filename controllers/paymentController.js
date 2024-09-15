import crypto from "crypto";
import PaymentModel from "../models/paymentModel.js";
import { instance } from "../app.js";
import asyncHandler from "../utils/asyncHanlder.js";
import ApiResponse from "../utils/ApiResponse.js";
import UsersModel from "../models/userModel.js";
import ProductModel from "../models/productModel.js";
import OrderModel from "../models/orderModel.js";

export const getRazorpayApiKey = asyncHandler(async (req, res) => {
  res
    .status(200)
    .json(new ApiResponse(201, { key: process.env.RAZORPAY_API_KEY }, ""));
});

export const checkout = asyncHandler(async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  const order = await instance.orders.create(options);

  res.status(200).json(new ApiResponse(201, order, "checkout successfully"));
});

export const paymentVerification = asyncHandler(async (req, res) => {
  const user = await UsersModel.findById(req.user._id).populate("cart.product");

  if (!user) {
    throw new ApiError(409, "User not found");
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    let cart = user.cart;

    //total
    let totalMrp = 0;
    let totalPrice = 0;
    let shippingCharges = 0;
    let estimatedTotal = 0;
    let enable = false;
    let orderItems = [];

    if (cart.length > 0) {
      for (let i = 0; i < cart.length; i++) {
        let q = cart[i].product.sizes.find(
          (item) => item.size === cart[i].size
        );
        if (q.stock >= cart[i].quantity) {
          totalMrp += cart[i].quantity * cart[i].product.mrp;
          totalPrice += cart[i].quantity * cart[i].product.price;
          let orderItemList = {
            image: cart[i].product?.images[0].url,
            name: cart[i].product.title,
            price: cart[i].product.price,
            quantity: cart[i].quantity,
            size: cart[i].size,
            totalPrice: cart[i].quantity * cart[i].product.price,
            product: cart[i].product._id,
          };

          orderItems.push(orderItemList);
          if (totalPrice > 1500) {
            shippingCharges = 0;
          } else {
            shippingCharges = 75;
          }
          estimatedTotal = totalPrice + shippingCharges;
          enable = true;
        } else {
          enable = false;
        }
      }
    }

    if (!enable) {
      throw new ApiError(
        409,
        "Something wrong with ordered product quantity, please check! "
      );
    }

    let paymentInfo = {
      id: expectedSignature,
      status: "succeeded",
    };

    const orderData = {
      shippingInfo: {
        ...req.body.address,
      },
      paymentInfo,
      orderItems,
      itemsPrice: totalPrice,
      shippingPrice: shippingCharges,
      totalPrice: estimatedTotal,
      user: user._id,
      paidAt: Date.now(),
    };

    await OrderModel.create(orderData);

    await PaymentModel.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    user.cart = [];
    await user.save();

    return res
      .status(201)
      .json(new ApiResponse(201, {}, `ordered successfull`));
  }
});
