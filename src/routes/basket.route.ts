import { Router } from "express";
import {
	createBasket,
	getAllBaskets,
	getBasketById,
	updateBasketById,
	deleteBasket,
	softDeleteBasketById
} from "../conrollers/basket.controller";
import { isAdmin } from "../middleware/IsAdmin";
import authMiddleware from "../middleware/JWT";
import upload from "../config/multer";

const router: Router = Router();

// CREATE a new basket item
router.post("/create", upload.single("imageUpload"), createBasket);

// READ all basket items
router.get("/find-all", getAllBaskets);

// READ a single basket item by ID
router.get("/find/:id", getBasketById);

// UPDATE a basket item by ID
router.patch("/update/:id", authMiddleware, isAdmin, updateBasketById);

// DELETE a basket item by ID
router.delete("/delete/:id", authMiddleware, isAdmin, deleteBasket);

// SOFT DELETE a basket item by ID
router.delete("/remove/:id", authMiddleware, isAdmin, softDeleteBasketById);

export default router;
