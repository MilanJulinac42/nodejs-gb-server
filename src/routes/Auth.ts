import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../conrollers/Auth";

const router: Router = Router();

// REGISTER user
router.post('/register', registerUser);

// LOGIN user
router.post('/login', loginUser);

// LOGOUT user
router.post('/logout', logoutUser);

export default router;