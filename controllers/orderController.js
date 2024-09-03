import UsersModel from "../models/userModel.js";
import ProductModel from "../models/productModel.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHanlder.js";
import ApiResponse from "../utils/ApiResponse.js";
import OrderModel from "../models/orderModel.js";

//create new order
export const createOrderController = asyncHandler(async (req, res) => {
  const user = await UsersModel.findById(req.user._id).populate("cart.product");

  if (!user) {
    throw new ApiError(409, "User not found");
  }

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
      let q = cart[i].product.sizes.find((item) => item.size === cart[i].size);
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

  const orderData = {
    ...req.body,
    orderItems,
    itemsPrice: totalPrice,
    shippingPrice: shippingCharges,
    totalPrice: estimatedTotal,
    user: user._id,
    paidAt: Date.now(),
  };

  const order = await OrderModel.create(orderData);

  if (!order) {
    throw new ApiError(400, "Something went wrong");
  }

  return res
    .status(200)
    .json(new ApiResponse(201, order, `ordered successfull`));
});
