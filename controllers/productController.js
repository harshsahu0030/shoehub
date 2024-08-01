import UsersModel from "../models/userModel.js";
import ProductModel from "../models/producModel.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHanlder.js";
import ApiResponse from "../utils/ApiResponse.js";

//get product details
export const getAllProductsController = asyncHandler(async (req, res) => {
  const products = await ProductModel.find();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
      },
      null
    )
  );
});

//get product details
export const getProductController = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        product,
      },
      null
    )
  );
});

//-----------------------------------------------------------------------------
//admin controllers

//create new product
export const createProductController = asyncHandler(async (req, res) => {
  const user = await UsersModel.findById(req.user._id);

  if (!user) {
    throw new ApiError(409, "User not found");
  }

  //add cloundinary --- TODO

  const productData = {
    ...req.body,
    user: user._id,
  };

  const product = await ProductModel.create(productData);

  if (!product) {
    throw new ApiError(400, "Something went wrong");
  }

  return res.status(200).json(
    new ApiResponse(
      201,
      {
        product,
      },
      `product created`
    )
  );
});
