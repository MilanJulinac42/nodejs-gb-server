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
import createBasketTypeValidation from "../middleware/validation/basketTypeValidation";
import objectIdValidation from "../middleware/validation/objectIdValidation";

const router: Router = Router();

// CREATE a new basket type
router.post("/create", createBasketTypeValidation, authMiddleware, isAdmin, createBasketType);

// READ all basket types
router.get("/find-all", getBasketTypes);

// READ a single basket type by ID
router.get("/find/:id", objectIdValidation, getBasketTypeById);

// UPDATE a basket type by ID
router.patch("/update/:id", objectIdValidation, authMiddleware, isAdmin, updateBasketTypeById);

// DELETE a basket type by ID
router.delete("/delete/:id", objectIdValidation, authMiddleware, isAdmin, deleteBasketTypeById);

// SOFT DELETE a basket type by ID
router.patch("/remove/:id", objectIdValidation, authMiddleware, isAdmin, softDeleteBasketTypeById);

export default router;
