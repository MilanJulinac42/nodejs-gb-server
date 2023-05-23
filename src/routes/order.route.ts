import { Router } from "express";
import authMiddleware from "../middleware/JWT";
import { isAdmin } from "../middleware/IsAdmin";
import { changeOrderStatus, createOrder, getOrder, getOrders, updateOrderById } from "../conrollers/order.controller";

const router: Router = Router();

// CREATE a new order
router.post("/create", authMiddleware, isAdmin, createOrder);

// READ all orders
router.get("/find-all", authMiddleware, isAdmin, getOrders);

// READ a single order by order ID
router.get("/find/:id", authMiddleware, isAdmin, getOrder);

// CHANGE order status by order ID
router.patch("/change-order-status/:id", authMiddleware, isAdmin, changeOrderStatus);

// UPDATE a single order by order ID
router.patch("/update-order/:id", authMiddleware, isAdmin, updateOrderById);

export default router;
