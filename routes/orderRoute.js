import express from "express";
import { authorizeRoles, isAuthenticated } from "../middlewares/auth.js";
import { createOrderController } from "../controllers/orderController.js";

const router = express.Router();

//get all products
router.route("/orders/new").post(isAuthenticated, createOrderController);

export default router;
