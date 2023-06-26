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
import objectIdValidation from "../middleware/validation/objectIdValidation";

const router: Router = Router();

// CREATE a new basket item
router.post("/create", authMiddleware, createBasketItemValidation, isAdmin, createBasketItem);

// READ all basket items
router.get("/find-all", getBasketItems);

// READ a single basket item by ID
router.get("/find/:id", objectIdValidation, getBasketItemById);

// UPDATE a basket item by ID
router.patch("/update/:id", objectIdValidation, authMiddleware, isAdmin, updateBasketItemById);

// DELETE a basket item by ID
router.delete("/delete/:id", objectIdValidation, authMiddleware, isAdmin, deleteBasketItemById);

// SOFT DELETE a basket item by ID
router.patch("/remove/:id", objectIdValidation, authMiddleware, isAdmin, softDeleteBasketItemById);

export default router;
