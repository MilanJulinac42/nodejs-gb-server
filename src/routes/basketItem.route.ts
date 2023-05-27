import { Router } from "express";
import {
	createBasketItem,
	getBasketItems,
	getBasketItemById,
	updateBasketItemById,
	deleteBasketItemById,
	softDeleteBasketItemById
} from "../conrollers/basketItem.controller";
import { isAdmin } from "../middleware/IsAdmin";
import authMiddleware from "../middleware/JWT";
import createBasketItemValidation from "../middleware/validation/basketItemValidation";

const router: Router = Router();

// CREATE a new basket item
router.post("/create", authMiddleware, createBasketItemValidation, isAdmin, createBasketItem);

// READ all basket items
router.get("/find-all", getBasketItems);

// READ a single basket item by ID
router.get("/find/:id", getBasketItemById);

// UPDATE a basket item by ID
router.patch("/update/:id", authMiddleware, isAdmin, updateBasketItemById);

// DELETE a basket item by ID
router.delete("/delete/:id", authMiddleware, isAdmin, deleteBasketItemById);

// SOFT DELETE a basket item by ID
router.delete("/remove/:id", authMiddleware, isAdmin, softDeleteBasketItemById);

export default router;
