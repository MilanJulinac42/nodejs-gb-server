import { Request, Response } from "express";
import {
	getShoppingCart,
	addToShoppingCart,
	updateShoppingCartItem,
	removeFromShoppingCart
} from "../services/shoppingCart.service";

export async function getShoppingCartController(req: Request, res: Response): Promise<void> {
	try {
		const userId = req.params.userId;
		const shoppingCart = await getShoppingCart(userId);
		res.status(200).json(shoppingCart);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}

export async function addToShoppingCartController(req: Request, res: Response): Promise<void> {
	try {
		const userId = req.params.userId;
		const { basketId, quantity } = req.body;
		const updatedShoppingCart = await addToShoppingCart(userId, basketId, quantity);
		res.status(200).json(updatedShoppingCart);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}

export async function updateShoppingCartItemController(req: Request, res: Response): Promise<void> {
	try {
		const userId = req.params.userId;
		const { basketId, newQuantity } = req.body;
		const updatedShoppingCart = await updateShoppingCartItem(userId, basketId, newQuantity);
		res.status(200).json(updatedShoppingCart);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}

export async function removeFromShoppingCartController(req: Request, res: Response): Promise<void> {
	try {
		const userId = req.params.userId;
		const basketId = req.params.basketId;
		const updatedShoppingCart = await removeFromShoppingCart(userId, basketId);
		res.status(200).json(updatedShoppingCart);
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
}
