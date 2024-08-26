import express from "express";
import {
  addCartController,
  addWishlistController,
  deleteUserRoleController,
  findAllUsersController,
  findUserController,
  forgotUserPasswordController,
  getUserCartController,
  getUserWishlistController,
  loadUserController,
  loginUserController,
  logoutUserController,
  registerUserController,
  registerUserVerificationController,
  removeCartController,
  removeWishlistController,
  resendRegisterUserVerificationOtpController,
  resetUserPasswordController,
  updateCartController,
  updateUserPasswordController,
  updateUserProfileController,
  updateUserRoleController,
} from "../controllers/userController.js";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//testing route
router
  .route("/testing")
  .get((_, res) =>
    res.status(200).json({ sucess: true, message: "Testing Successfull" })
  );

//register user
router.route("/register").post(registerUserController);

//register user Verification
router
  .route("/register/verification/:id")
  .post(registerUserVerificationController);

//register user Verification
router
  .route("/register/verification/code-resend/:id")
  .get(resendRegisterUserVerificationOtpController);

//login user
router.route("/login").post(loginUserController);

//load user
router.route("/load").get(isAuthenticated, loadUserController);

//logout user
router.route("/logout").get(isAuthenticated, logoutUserController);

//update password
router
  .route("/update/password")
  .put(isAuthenticated, updateUserPasswordController);

//update profile
router
  .route("/update/profile")
  .put(isAuthenticated, updateUserProfileController);

//forgot password
router.route("/forgot/password").post(forgotUserPasswordController);

//reset password
router.route("/reset/password/:token").put(resetUserPasswordController);

//-----------------------------------------------------------------------------
//wishlist

//get wishlist
router.route("/wishlists").get(isAuthenticated, getUserWishlistController);

//add wishlist
//remove wishlist
router
  .route("/wishlist/:id")
  .post(isAuthenticated, addWishlistController)
  .delete(isAuthenticated, removeWishlistController);

//-----------------------------------------------------------------------------
//cart

//get cart
router.route("/cart").get(isAuthenticated, getUserCartController);

//update cart
//add cart
//delete cart
router
  .route("/cart/:id")
  .post(isAuthenticated, addCartController)
  .put(isAuthenticated, updateCartController)
  .delete(isAuthenticated, removeCartController);

//-----------------------------------------------------------------------------
//admin routes

//all users
router
  .route("/admin/users")
  .get(isAuthenticated, authorizeRoles("admin"), findAllUsersController);

//get, update, delete user
router
  .route("/admin/user/:id")
  .get(isAuthenticated, authorizeRoles("admin"), findUserController)
  .put(isAuthenticated, authorizeRoles("admin"), updateUserRoleController)
  .delete(isAuthenticated, authorizeRoles("admin"), deleteUserRoleController);

export default router;
