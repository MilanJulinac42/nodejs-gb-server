import { Router } from "express";
import {
	createBasketType,
	getBasketTypes,
	getBasketTypeById,
	updateBasketTypeById,
	deleteBasketTypeById,
	softDeleteBasketTypeById
} from "../conrollers/basketType.controller";
import authMiddleware from "../middleware/JWT";

const router: Router = Router();

// CREATE a new basket type
router.post("/create", authMiddleware, createBasketType);

// READ all basket types
router.get("/find-all", getBasketTypes);

// READ a single basket type by ID
router.get("/find/:id", getBasketTypeById);

// UPDATE a basket type by ID
router.patch("/update/:id", authMiddleware, updateBasketTypeById);

// DELETE a basket type by ID
router.delete("/delete/:id", authMiddleware, deleteBasketTypeById);

// SOFT DELETE a basket type by ID
router.delete("/remove/:id", authMiddleware, softDeleteBasketTypeById);

export default router;
