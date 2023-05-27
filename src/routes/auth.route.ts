import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../conrollers/auth.controller";
import createUserValidation from "../middleware/validation/userValidation";
import { loginUserValidation } from "../middleware/validation/loginValidation";

const router: Router = Router();

// REGISTER user
router.post("/register", createUserValidation, registerUser);

// LOGIN user
router.post("/login", loginUserValidation, loginUser);

// LOGOUT user
router.post("/logout", logoutUser);

export default router;
