import { Router } from "express";
import {
	redisterUser,
  loginUser,
	getUsers,
	getUserById,
	updateUserById,
	deleteUserById,
	softDeleteUserById
} from "../conrollers/User";

const router: Router = Router();

// CREATE a new user
router.post("/create", redisterUser);

// LOGIN a user
router.post("/login", loginUser);

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
