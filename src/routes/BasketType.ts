import { Router } from "express";
import {
  createBasketType,
  getBasketTypes,
  getBasketTypeById,
  updateBasketTypeById,
  deleteBasketTypeById,
} from "../conrollers/BasketType";

const router: Router = Router();

// CREATE a new basket type
router.post("/create", createBasketType);

// READ all basket types
router.get("/find-all", getBasketTypes);

// READ a single basket type by ID
router.get("/find/:id", getBasketTypeById);

// UPDATE a basket type by ID
router.patch("/update/:id", updateBasketTypeById);

// DELETE a basket type by ID
router.delete("/delete/:id", deleteBasketTypeById);

export default router;
