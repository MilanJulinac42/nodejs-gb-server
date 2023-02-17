import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import Basket, { IBasketModel, IBasket } from "../models/Basket";
import BasketItem, { IBasketItemModel } from "../models/BasketItem";
import BasketType, { IBasketTypeModel } from "../models/BasketType";

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

		// TODO:: skontaj kolicinu predmeta (sta ako jedan predmet vise puta unosimo u korpu)
		// posebna tabela za to?

		for(const giftBasketItemId of savedBasket.giftBasketItems) {
			console.log(giftBasketItemId)
			const giftBasketItem: IBasketItemModel | null = await BasketItem.findById(giftBasketItemId);
			if(giftBasketItem) {
				giftBasketItem.giftBasket.push(savedBasket._id);
				await giftBasketItem.save();
			}
		}

		const giftBasketType: IBasketTypeModel | null = await BasketType.findById(basketType);
		if (giftBasketType) {
			giftBasketType.giftBasket = savedBasket._id;
			await giftBasketType.save();
		}

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

// export const updateBasketById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { id } = req.params;

//     // Extract the fields to update from the request body
//     const { name, description, price, profit, type, isSerbian, giftBasketItems } = req.body;

//     // Create an object with the fields to update
//     const updatedFields: Partial<IBasket> = {
//       name,
//       description,
//       price,
//       profit,
//       type,
//       isSerbian,
//     };

//     // Update the Basket document with the new field values
//     const updatedBasket: IBasketModel | null = await Basket.findByIdAndUpdate(
//       id,
//       { $set: updatedFields },
//       { new: true },
//     );

//     if (!updatedBasket) {
//       return res.status(404).json({ message: 'Basket not found' });
//     }

//     // Update the giftBasketItems array of the Basket's associated GiftBasketItem documents
//     const basketIds = giftBasketItems.map((item: string) => mongoose.Types.ObjectId(item));
//     const giftBasketItems: IGiftBasketItemModel[] = await GiftBasketItem.find({
//       giftBasketItems: updatedBasket._id,
//     });
//     giftBasketItems.forEach(async (item) => {
//       const existingBasketIndex = item.giftBasketItems.findIndex(
//         (basketId) => basketId.toHexString() === updatedBasket._id.toHexString(),
//       );
//       if (existingBasketIndex !== -1) {
//         // If the Basket ID is already in the giftBasketItems array, update the fields
//         item.giftBasketItems[existingBasketIndex] = updatedBasket._id;
//       } else {
//         // If the Basket ID is not in the giftBasketItems array, push it onto the end
//         item.giftBasketItems.push(updatedBasket._id);
//       }
//       await item.save();
//     });

//     res.status(200).json({ message: 'Basket updated successfully', basket: updatedBasket });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating basket', error });
//   }
// };

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
