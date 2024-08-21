import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";
import {
  addReviewOnProductController,
  createProductController,
  deleteReviewOnProductController,
  getAllProductsController,
  getProductController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();

//get all products
router.route("/products").get(getAllProductsController);

//get product details
router.route("/products/:id").get(getProductController);

//-----------------------------------------------------------------------------
//users

//add product review
router
  .route("/products/review/:id")
  .post(isAuthenticated, addReviewOnProductController)
  .delete(isAuthenticated, deleteReviewOnProductController);

//-----------------------------------------------------------------------------
//admin routes

//create new product
router
  .route("/admin/products/new")
  .post(isAuthenticated, authorizeRoles("admin"), createProductController);

//update product
router
  .route("/admin/products/:id")
  .put(isAuthenticated, authorizeRoles("admin"), updateProductController);

export default router;
