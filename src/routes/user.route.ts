import { Router } from "express";
import {
	getUsers,
	getUserById,
	updateUserById,
	deleteUserById,
	softDeleteUserById
} from "../conrollers/user.controller";
import { isAdmin } from "../middleware/IsAdmin";
import authMiddleware from "../middleware/JWT";
import objectIdValidation from "../middleware/validation/objectIdValidation";

const router: Router = Router();

// READ all users
router.get("/find-all", authMiddleware, isAdmin, getUsers);

// READ a single user by ID
router.get("/find/:id", objectIdValidation, authMiddleware, getUserById);

// UPDATE a user by ID
router.patch("/update/:id", objectIdValidation, authMiddleware, updateUserById);

// DELETE a user by ID
router.delete("/delete/:id", objectIdValidation, authMiddleware, isAdmin, deleteUserById);

// SOFT DELETE a user by ID
router.delete("/remove/:id", objectIdValidation, authMiddleware, softDeleteUserById);

export default router;
