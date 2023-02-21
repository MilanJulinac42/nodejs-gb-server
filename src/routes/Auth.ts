import { Router } from "express";
import { registerUser, loginUser } from "../conrollers/Auth";

const router: Router = Router();

// REGISTER user
router.post('/register', registerUser);

// LOGIN user
router.post('/login', loginUser);

export default router;