import express from 'express';
import {
  getShoppingCartController,
  addToShoppingCartController,
  updateShoppingCartItemController,
  removeFromShoppingCartController,
} from '../conrollers/shoppingCart.controller';

const router = express.Router();

router.get('/:userId', getShoppingCartController);
router.post('/:userId/add', addToShoppingCartController);
router.put('/:userId/update', updateShoppingCartItemController);
router.delete('/:userId/remove/:basketId', removeFromShoppingCartController);

export default router;
