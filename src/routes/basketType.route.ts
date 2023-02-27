import { Router } from "express";
import {
	createBasketType,
	getBasketTypes,
	getBasketTypeById,
	updateBasketTypeById,
	deleteBasketTypeById,
	softDeleteBasketTypeById
} from "../conrollers/basketType.controller";
import { isAdmin } from "../middleware/IsAdmin";
import authMiddleware from "../middleware/JWT";

const router: Router = Router();

// CREATE a new basket type
router.post("/create", authMiddleware, isAdmin, createBasketType);

// READ all basket types
router.get("/find-all", getBasketTypes);

// READ a single basket type by ID
router.get("/find/:id", getBasketTypeById);

// UPDATE a basket type by ID
router.patch("/update/:id", authMiddleware, isAdmin, updateBasketTypeById);

// DELETE a basket type by ID
router.delete("/delete/:id", authMiddleware, isAdmin, deleteBasketTypeById);

// SOFT DELETE a basket type by ID
router.delete("/remove/:id", authMiddleware, isAdmin, softDeleteBasketTypeById);

export default router;
