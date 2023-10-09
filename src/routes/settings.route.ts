import { Router } from "express";
import authMiddleware from "../middleware/JWT";
import { isAdmin } from "../middleware/IsAdmin";
import { createSettings, getSettings, updateSettings } from "../conrollers/settings.controller";

const router: Router = Router();

// CREATE settings
router.post("/create", authMiddleware, isAdmin, createSettings);

// READ settings
router.get("/find", authMiddleware, isAdmin, getSettings);

// UPDATE settings
router.patch("/update-settings", authMiddleware, isAdmin, updateSettings);
