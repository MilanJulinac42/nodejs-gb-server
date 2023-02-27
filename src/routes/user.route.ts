import { Router } from "express";
import {
	getUsers,
	getUserById,
	updateUserById,
	deleteUserById,
	softDeleteUserById
} from "../conrollers/user.controller";
import authMiddleware from "../middleware/JWT";

const router: Router = Router();

// READ all users
router.get("/find-all", authMiddleware, getUsers);

// READ a single user by ID
router.get("/find/:id", authMiddleware, getUserById);

// UPDATE a user by ID
router.patch("/update/:id", authMiddleware, updateUserById);

// DELETE a user by ID
router.delete("/delete/:id", authMiddleware, deleteUserById);

// SOFT DELETE a user by ID
router.delete("/remove/:id", authMiddleware, softDeleteUserById);

export default router;
