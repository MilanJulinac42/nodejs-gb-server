import { Request, Response, NextFunction } from "express";
import Basket, { IBasketModel, IBasket } from "../models/Basket";

// CREATE a new gift basket
export const createBasket = async (req: Request, res: Response): Promise<void> => {
	try {
		const { name, description, price, profit, type, giftBasketItems, basketType, isSerbian } = req.body;

		const newBasket: IBasketModel = new Basket({
			name,
			description,
			price,
			profit,
			type,
			giftBasketItems,
			basketType,
			isSerbian
		});

		const savedBasket = await newBasket.save();

		res.status(201).json({ message: "Basket created", basket: savedBasket });
	} catch (error) {
		res.status(500).json({ message: "Error creating basket", error });
	}
};

// READ all gift baskets
export const getAllBaskets = async (req: Request, res: Response): Promise<void> => {
	try {
		const baskets = await Basket.find().populate("giftBasketItems", "basketType");

		res.status(200).json({ message: "Baskets found", baskets });
	} catch (error) {
		res.status(500).json({ message: "Error retrieving baskets", error });
	}
};

// READ a single gift basket by ID
export const getBasketById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const basket = await Basket.findById(id).populate("giftBasketItems", "basketType");

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

		const updatedFields: Partial<IBasket> = req.body;

		const updatedBasket: IBasketModel | null = await Basket.findByIdAndUpdate(id, { $set: updatedFields }, { new: true }).populate("giftBasketItems", "basketType");

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

		const deletedBasket: IBasketModel | null = await Basket.findByIdAndDelete(id);

		if (deletedBasket) {
			res.status(200).json({ message: "Basket deleted successfully", basket: deletedBasket });
		} else {
			res.status(404).json({ message: "Basket not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error deleting basket", error });
	}
};
