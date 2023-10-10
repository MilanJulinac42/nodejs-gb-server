import { Router } from "express";
import {
	createBasket,
	getAllBaskets,
	getBasketById,
	updateBasketById,
	deleteBasket,
	softDeleteBasketById,
	restoreBasketById,
	getSettingsBaskets
} from "../conrollers/basket.controller";
import { isAdmin } from "../middleware/IsAdmin";
import authMiddleware from "../middleware/JWT";
import upload from "../config/multer";
import createBasketValidation from "../middleware/validation/basketValidation";
import objectIdValidation from "../middleware/validation/objectIdValidation";

const router: Router = Router();

// CREATE a new basket item
router.post("/create", authMiddleware, isAdmin, upload.single("imageUpload"), createBasket);

// READ all basket items
router.get("/find-all", getAllBaskets);

// READ a single basket item by ID
router.get("/find/:id", objectIdValidation, getBasketById);

// UPDATE a basket item by ID
router.patch(
	"/update/:id",
	objectIdValidation,
	authMiddleware,
	isAdmin,
	upload.single("imageUpload"),
	updateBasketById
);

// DELETE a basket item by ID
router.delete("/delete/:id", objectIdValidation, authMiddleware, isAdmin, deleteBasket);

// SOFT DELETE a basket item by ID
router.patch("/remove/:id", objectIdValidation, authMiddleware, isAdmin, softDeleteBasketById);

// RESTORE soft deleted basket by ID
router.patch("/restore/:id", objectIdValidation, authMiddleware, isAdmin, restoreBasketById);

// GET baskets for settings gallery
router.get("/settings-baskets", getSettingsBaskets);

export default router;
