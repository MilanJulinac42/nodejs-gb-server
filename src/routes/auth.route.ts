import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../conrollers/auth.controller";
import createUserValidation from "../middleware/validation/userValidation";

const router: Router = Router();

// REGISTER user
router.post("/register", createUserValidation, registerUser);

// LOGIN user
router.post("/login", loginUser);

// LOGOUT user
router.post("/logout", logoutUser);

export default router;
