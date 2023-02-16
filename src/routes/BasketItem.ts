import { Router } from "express";
import {
  createBasketItem,
  getBasketItems,
  getBasketItemById,
  updateBasketItemById,
  deleteBasketItemById,
} from "../conrollers/BasketItem";

const router: Router = Router();

// CREATE a new basket item
router.post("/create", createBasketItem);

// READ all basket items
router.get("/find-all", getBasketItems);

// READ a single basket item by ID
router.get("/find/:id", getBasketItemById);

// UPDATE a basket item by ID
router.patch("/update/:id", updateBasketItemById);

// DELETE a basket item by ID
router.delete("/delete/:id", deleteBasketItemById);

export default router;
