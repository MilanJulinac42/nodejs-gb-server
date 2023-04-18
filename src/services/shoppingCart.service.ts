import ShoppingCartModel, { IShoppingCartModel, IShoppingCartItem } from '../models/ShoppingCart.model';

export async function getShoppingCart(userId: string): Promise<IShoppingCartModel | null> {
  const shoppingCart = await ShoppingCartModel.findOne({ user: userId }).populate('items.basket');
  return shoppingCart;
}


export async function addToShoppingCart(userId: string, basketId: string, quantity: number): Promise<IShoppingCartModel> {
  const shoppingCart = await getShoppingCart(userId);

  if (!shoppingCart) {
    throw new Error('Shopping cart not found');
  }

  const existingItemIndex = shoppingCart.items.findIndex((item: IShoppingCartItem) => item.basket.toString() === basketId);

  if (existingItemIndex !== -1) {
    shoppingCart.items[existingItemIndex].quantity += quantity;
  } else {
    shoppingCart.items.push({ basket: basketId, quantity });
  }

  await shoppingCart.save();
  return shoppingCart;
}


export async function updateShoppingCartItem(userId: string, basketId: string, newQuantity: number): Promise<IShoppingCartModel> {
  const shoppingCart = await getShoppingCart(userId);

  if (!shoppingCart) {
    throw new Error('Shopping cart not found');
  }

  const existingItemIndex = shoppingCart.items.findIndex((item: IShoppingCartItem) => item.basket.toString() === basketId);

  if (existingItemIndex === -1) {
    throw new Error('Item not found in shopping cart');
  }

  shoppingCart.items[existingItemIndex].quantity = newQuantity;
  await shoppingCart.save();
  return shoppingCart;
}

export async function removeFromShoppingCart(userId: string, basketId: string): Promise<IShoppingCartModel> {
  const shoppingCart = await getShoppingCart(userId);

  if (!shoppingCart) {
    throw new Error('Shopping cart not found');
  }

  shoppingCart.items = shoppingCart.items.filter((item: IShoppingCartItem) => item.basket.toString() !== basketId);
  await shoppingCart.save();
  return shoppingCart;
}
