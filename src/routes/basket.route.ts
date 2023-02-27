import { Router, Request, Response, NextFunction } from "express";
import {
	createBasket,
	getAllBaskets,
	getBasketById,
	updateBasketById,
	deleteBasket,
	softDeleteBasketById
} from "../conrollers/basket.controller";
import authMiddleware from "../middleware/JWT";

const router: Router = Router();

// CREATE a new basket item
router.post("/create", authMiddleware, createBasket);

// READ all basket items
router.get("/find-all", getAllBaskets);

// READ a single basket item by ID
router.get("/find/:id", getBasketById);

// UPDATE a basket item by ID
router.patch("/update/:id", authMiddleware, updateBasketById);

// DELETE a basket item by ID
router.delete("/delete/:id", authMiddleware, deleteBasket);

// SOFT DELETE a basket item by ID
router.delete("/remove/:id", authMiddleware, softDeleteBasketById);

export default router;
