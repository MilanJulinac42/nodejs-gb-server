import { Router } from "express";
import {
  createBasket,
  getAllBaskets,
  getBasketById,
  updateBasketById,
  deleteBasket,
} from "../conrollers/Basket";

const router: Router = Router();

// CREATE a new basket item
router.post("/create", createBasket);

// READ all basket items
router.get("/find-all", getAllBaskets);

// READ a single basket item by ID
router.get("/find/:id", getBasketById);

// UPDATE a basket item by ID
router.patch("/update/:id", updateBasketById);

// DELETE a basket item by ID
router.delete("/delete/:id", deleteBasket);

export default router;
