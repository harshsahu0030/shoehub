import UsersModel from "../models/userModel.js";
import ProductModel from "../models/productModel.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHanlder.js";
import ApiResponse from "../utils/ApiResponse.js";
import cloudinary from "cloudinary";

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
  const { images } = req.body;

  if (!user) {
    throw new ApiError(409, "User not found");
  }

  //add cloundinary
  let imagesLinks = [];

  if (images.length <= 3) {
    throw new ApiError(404, "There should be atleast 3 images of product");
  }

  for (let i = 0; i < images.length; i++) {
    let result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });

    req.body.images = imagesLinks;
  }

  const productData = {
    ...req.body,
    user: user._id,
  };

  const product = await ProductModel.create(productData);

  if (!product) {
    throw new ApiError(400, "Something went wrong");
  }

  return res.status(200).json(new ApiResponse(201, product, `product created`));
});

//update product
export const updateProductController = asyncHandler(async (req, res) => {
  let product = await ProductModel.findById(req.params.id);
  const { images } = req.body;

  if (!product) {
    throw new ApiError(400, "Product not found");
  }

  //add cloundinary
  // let imagesLinks = [];

  // if (images.length <= 3) {
  //   throw new ApiError(404, "There should be atleast 3 images of product");
  // }

  // for (let i = 0; i < images.length; i++) {
  //   let result = await cloudinary.v2.uploader.upload(images[i], {
  //     folder: "shoehub-products",
  //   });

  //   imagesLinks.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });

  //   req.body.images = imagesLinks;

  req.body.discount = Math.floor(
    ((req.body.mrp - req.body.price) / req.body.mrp) * 100
  );

  req.body.images = product.images;

  product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      user: req.user._id,
    },

    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  return res.status(200).json(new ApiResponse(200, product, `product updated`));
});

//---------------------------------------------------------------
//user

// //product rating counts
// function productRatingCounts(product) {
//   product.ratingCounts = {
//     1: 0,
//     2: 0,
//     3: 0,
//     4: 0,
//     5: 0,
//   };

//   product.reviews
//     .map((item) => item.rating)
//     .forEach((element) => {
//       product.ratingCounts[element] = product.ratingCounts[element]
//         ? product.ratingCounts[element] + 1
//         : 1;
//     });
// }

//average rating
function averageRating(product) {
  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let result =
    avg / (product.reviews.length === 0 ? 1 : product.reviews.length);

  product.ratings = parseFloat(result.toFixed(1));
}

//add and update review on product
export const addReviewOnProductController = asyncHandler(
  async (req, res, next) => {
    let product = await ProductModel.findById(req.params.id);
    const user = await UsersModel.findById(req.user._id);

    const { rating, comment } = req.body;

    const review = {
      user: user._id,
      name: user.username,
      rating,
      comment,
    };

    if (!product) {
      throw new ApiError(400, "Product not found");
    }

    //checking for owner of the product
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    //average ratings
    averageRating(product);

    await product.save();

    return res.status(200).json(new ApiResponse(200, null, `review updated`));
  }
);

//delete review on product
export const deleteReviewOnProductController = asyncHandler(
  async (req, res, next) => {
    let product = await ProductModel.findById(req.params.id);
    const user = await UsersModel.findById(req.user._id);

    if (!product) {
      throw new ApiError(400, "Product not found");
    }
    //checking for owner of the product
    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev, i) => {
        if (rev.user.toString() === req.user._id.toString()) {
          product.reviews.splice(i);
          product.numOfReviews = product.reviews.length;
        }
      });
    } else {
      return next(new ErrorHandler("not authorized", 400));
    }

    //average ratings
    averageRating(product);

    await product.save({ validateBeforeSave: false });

    return res.status(200).json(new ApiResponse(200, null, `review deleted`));
  }
);
