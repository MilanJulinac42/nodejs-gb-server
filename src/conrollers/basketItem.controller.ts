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

// READ all basket items, with optional query parameter for admin view
export const getBasketItems = async (req: Request, res: Response): Promise<void> => {
	try {
		const limit = parseInt(req.query.limit as string) || 10;
		const page = parseInt(req.query.page as string) || 1;
		const sortBy = req.query.sortBy as string;
		const sortOrder = req.query.sortOrder as string;
		const name = req.query.name as string;
		const priceFrom = parseInt(req.query.priceFrom as string) || undefined;
		const priceTo = parseInt(req.query.priceTo as string) || undefined;

		const isForAdminBasketCreation = req.query.adminBasketCreation === "true";

		const basketItems = isForAdminBasketCreation
			? await BasketItemService.getBasketItemsForAdmin()
			: await BasketItemService.getBasketItems(limit, page, sortBy, sortOrder, name, priceFrom, priceTo);

		res.status(200).json({ basketItems });
	} catch (error) {
		res.status(500).json({ message: "Error retrieving basket types", error });
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

		const deletedBasketItem: IBasketItemModel | null = await BasketItemService.softDeleteBasketItemById(id);

		if (deletedBasketItem) {
			res.status(200).json({ message: "Basket item deleted succesfully", basket: deletedBasketItem });
		} else {
			res.status(404).json({ message: "Basket item not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error deleting basket item", error });
	}
};

// RESTORE basket item by id
export const restoreBasketItemById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const restoredBasketItem: IBasketItemModel | null = await BasketItemService.restoreBasketItemById(id);

		if (restoredBasketItem) {
			res.status(200).json({ message: "Basket item restored succesfully", basket: restoredBasketItem });
		} else {
			res.status(404).json({ message: "Basket item not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error restoring basket item", error });
	}
};
