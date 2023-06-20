import { Request, Response } from "express";
import { IBasketModel, IBasket } from "../models/Basket.model";
import BasketService from "../services/basket.service";
import { uploadImageToS3 } from "../services/imageUpload.service";

// CREATE a new gift basket
export const createBasket = async (req: Request, res: Response): Promise<void> => {
	try {
		const { name, description, price, profit, type, giftBasketItems, basketType, isSerbian, inStock } = req.body;

		const folder = "basket/";
		const file = req.file;

		const basketItemsParsed = JSON.parse(giftBasketItems);

		if (!file) {
			res.status(400).json({ error: "No file provided" });
			return;
		}

		const imageUrl = await uploadImageToS3(folder, file);

		if (!imageUrl) {
			res.status(500).json({ erorr: "File failed to upload" });
			return;
		}

		const savedBasket = await BasketService.createBasket({
			name,
			description,
			price,
			profit,
			type,
			giftBasketItems: basketItemsParsed,
			basketType,
			isSerbian,
			imageUrl,
			inStock
		});

		res.status(201).json({ message: "Basket created", basket: savedBasket });
	} catch (error) {
		res.status(500).json({ message: "Error creating basket", error });
	}
};

// READ all gift baskets
export const getAllBaskets = async (req: Request, res: Response): Promise<void> => {
	try {
		const limit = parseInt(req.query.limit as string) || 10;
		const page = parseInt(req.query.page as string) || 1;
		const sortBy = req.query.sortBy as string;
		const sortOrder = req.query.sortOrder as string;

		const baskets = await BasketService.getAllBaskets(limit, page, sortBy, sortOrder);

		res.status(200).json({ message: "Baskets found", baskets });
	} catch (error) {
		res.status(500).json({ message: "Error retrieving baskets", error });
	}
};

// READ a single gift basket by ID
export const getBasketById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const basket = await BasketService.getBasketById(id);

		if (basket) {
			res.status(200).json({ message: "Basket found", basket });
		} else {
			res.status(404).json({ message: "Basket not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error retrieving basket", error });
	}
};

// UPDATE a gift basket by ID
export const updateBasketById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const { name, description, price, profit, type, giftBasketItems, basketType, isSerbian, inStock } = req.body;

		const folder = "basket/";
		const file = req.file;

		const basketItemsParsed = giftBasketItems ? JSON.parse(giftBasketItems) : undefined;

		let imageUrl;
		if (file) {
			imageUrl = await uploadImageToS3(folder, file);
			if (!imageUrl) {
				res.status(500).json({ erorr: "File failed to upload" });
				return;
			}
		}
		const updatedFields: Partial<IBasket> = {
			...(name && { name }),
			...(description && { description }),
			...(price && { price }),
			...(profit && { profit }),
			...(type && { type }),
			...(basketItemsParsed && { giftBasketItems: basketItemsParsed }),
			...(basketType && { basketType }),
			...(isSerbian !== undefined && { isSerbian }),
			...(inStock && { inStock }),
			...(imageUrl && { imageUrl })
		};

		const updatedBasket: IBasketModel | null = await BasketService.updateBasketById(id, updatedFields);

		if (updatedBasket) {
			res.status(200).json({ message: "Basket updated successfully", basket: updatedBasket });
		} else {
			res.status(404).json({ message: "Basket not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error updating basket", error });
	}
};

// DELETE a gift basket by ID
export const deleteBasket = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const deletedBasket: IBasketModel | null = await BasketService.deleteBasket(id);

		if (deletedBasket) {
			res.status(200).json({ message: "Basket deleted successfully", basket: deletedBasket });
		} else {
			res.status(404).json({ message: "Basket not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error deleting basket", error });
	}
};

// SOFT DELETE a gift basket by id
export const softDeleteBasketById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const deletedBasket: IBasketModel | null = await BasketService.softDeleteBasketById(id);

		if (deletedBasket) {
			res.status(200).json({ message: "Basket deleted succesfully", basket: deletedBasket });
		} else {
			res.status(404).json({ message: "Basket not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error deleting basket", error });
	}
};
