import { Router } from "express";
import {
	getUsers,
	getUserById,
	updateUserById,
	deleteUserById,
	softDeleteUserById
} from "../conrollers/User";

const router: Router = Router();

// READ all users
router.get("/find-all", getUsers);

// READ a single user by ID
router.get("/find/:id", getUserById);

// UPDATE a user by ID
router.patch("/update/:id", updateUserById);

// DELETE a user by ID
router.delete("/delete/:id", deleteUserById);

// SOFT DELETE a user by ID
router.delete("/remove/:id", softDeleteUserById);

export default router;
