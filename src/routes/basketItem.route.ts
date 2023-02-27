import { Router } from "express";
import {
	createBasketItem,
	getBasketItems,
	getBasketItemById,
	updateBasketItemById,
	deleteBasketItemById,
	softDeleteBasketItemById
} from "../conrollers/basketItem.controller";
import authMiddleware from "../middleware/JWT";

const router: Router = Router();

// CREATE a new basket item
router.post("/create", authMiddleware, createBasketItem);

// READ all basket items
router.get("/find-all", getBasketItems);

// READ a single basket item by ID
router.get("/find/:id", getBasketItemById);

// UPDATE a basket item by ID
router.patch("/update/:id", authMiddleware, updateBasketItemById);

// DELETE a basket item by ID
router.delete("/delete/:id", authMiddleware, deleteBasketItemById);

// SOFT DELETE a basket item by ID
router.delete("/remove/:id", authMiddleware, softDeleteBasketItemById);

export default router;
