import { Request, Response } from "express";
import BasketItem, { IBasketItem, IBasketItemModel } from "../models/BasketItem.model";
import BasketItemService from "../services/basketItem.service";

// CREATE a new basket item
export const createBasketItem = async (req: Request, res: Response): Promise<void> => {
	try {
		const { name, description, price, weight, isSerbian } = req.body;

		const newBasketItem: IBasketItemModel = new BasketItem({ name, description, price, weight, isSerbian });

		const createdBasketItem = await BasketItemService.createBasketItem(newBasketItem);

		res.status(201).json({ message: "Basket item created successfully", basketItem: createdBasketItem });
	} catch (error) {
		res.status(500).json({ message: "Error creating basket item", error });
	}
};

// READ all basket items
export const getBasketItems = async (req: Request, res: Response): Promise<void> => {
	try {
		const basketItems: IBasketItemModel[] = await BasketItemService.getBasketItems();

		res.status(200).json({ basketItems });
	} catch (error) {
		res.status(500).json({ message: "Error retrieving basket items", error });
	}
};

// READ a single basket item by ID
export const getBasketItemById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const basketItem: IBasketItemModel | null = await BasketItemService.getBasketItemById(id);

		if (basketItem) {
			res.status(200).json({ basketItem });
		} else {
			res.status(404).json({ message: "Basket item not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error retrieving basket item", error });
	}
};

// UPDATE a basket item by ID
export const updateBasketItemById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const updatedFields: Partial<IBasketItem> = req.body;

		const updatedBasketItem: IBasketItemModel | null = await BasketItemService.updateBasketItemById(
			id,
			updatedFields
		);

		if (updatedBasketItem) {
			res.status(200).json({ message: "Basket item updated successfully", basketItem: updatedBasketItem });
		} else {
			res.status(404).json({ message: "Basket item not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error updating basket item", error });
	}
};

// DELETE a basket item by ID
export const deleteBasketItemById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const { deletedBasketItem, basket } = await BasketItemService.deleteBasketItemById(id);

		if (deletedBasketItem) {
			if (basket) {
				res.status(200).json({
					message: "Basket item deleted successfully",
					basketItem: deletedBasketItem,
					basket: basket
				});
			} else {
				res.status(404).json({ message: "Basket not found" });
			}
		} else {
			res.status(404).json({ message: "Basket item not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error deleting basket item", error });
	}
};

// SOFT DELETE basket item by id
export const softDeleteBasketItemById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const deletedBasketItem: IBasketItemModel | null = await BasketItem.findByIdAndUpdate(
			id,
			{ deleted: true },
			{ new: true }
		);

		if (deletedBasketItem) {
			res.status(200).json({ message: "Basket item deleted succesfully", basket: deletedBasketItem });
		} else {
			res.status(404).json({ message: "Basket item not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error deleting basket item", error });
	}
};
