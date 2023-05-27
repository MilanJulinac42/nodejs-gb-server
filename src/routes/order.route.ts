import { Router } from "express";
import { changeOrderStatus, createOrder, getOrder, getOrders, updateOrderById } from "../conrollers/order.controller";
import authMiddleware from "../middleware/JWT";
import { isAdmin } from "../middleware/IsAdmin";
import createOrderValidation from "../middleware/validation/orderValidation";
import objectIdValidation from "../middleware/validation/objectIdValidation";

const router: Router = Router();

// CREATE a new order
router.post("/create", createOrderValidation, authMiddleware, isAdmin, createOrder);

// READ all orders
router.get("/find-all", authMiddleware, isAdmin, getOrders);

// READ a single order by order ID
router.get("/find/:id", objectIdValidation, authMiddleware, isAdmin, getOrder);

// CHANGE order status by order ID
router.patch("/change-order-status/:id", objectIdValidation, authMiddleware, isAdmin, changeOrderStatus);

// UPDATE a single order by order ID
router.patch("/update-order/:id", objectIdValidation, authMiddleware, isAdmin, updateOrderById);

export default router;
