import mongoose from "mongoose";
import Basket, { IBasket, IBasketModel } from "../models/Basket.model";
import BasketItem, { IBasketItemModel } from "../models/BasketItem.model";
import BasketType, { IBasketTypeModel } from "../models/BasketType.model";

interface CreateBasketInput {
	name: string;
	description: string;
	price: number;
	profit: number;
	type: string;
	giftBasketItems: { item: string; quantity: number }[];
	basketType: string;
	isSerbian: boolean;
}

class BasketService {
	public async createBasket(basket: CreateBasketInput): Promise<IBasketModel> {
		const giftBasketItems = basket.giftBasketItems.map((itemQuantity) => ({
			item: new mongoose.Types.ObjectId(itemQuantity.item),
			quantity: itemQuantity.quantity
		}));

		const newBasket: IBasketModel = new Basket({ ...basket, giftBasketItems });

		const savedBasket = await newBasket.save();

		for (const giftBasketItemQuantity of savedBasket.giftBasketItems) {
			const giftBasketItem: IBasketItemModel | null = await BasketItem.findById(giftBasketItemQuantity.item);
			if (giftBasketItem) {
				giftBasketItem.giftBasket.push(savedBasket._id);
				await giftBasketItem.save();
			}
		}

		const giftBasketType: IBasketTypeModel | null = await BasketType.findById(basket.basketType);
		if (giftBasketType) {
			giftBasketType.giftBasket = savedBasket._id;
			await giftBasketType.save();
		}

		return savedBasket;
	}

	public async getAllBaskets(): Promise<IBasketModel[] | null> {
		return Basket.find().populate("giftBasketItems.item", "name description price").populate("basketType", "name");
	}

	public async getBasketById(id: string): Promise<IBasketModel | null> {
		return Basket.findById(id).populate("giftBasketItems.item", "name description price").populate("basketType", "name");
	}

	public async updateBasketById(id: string, updatedFields: Partial<IBasket>): Promise<IBasketModel | null> {
		const updatedBasket: IBasketModel | null = await Basket.findByIdAndUpdate(
			id,
			{ $set: updatedFields },
			{ new: true }
		);

		if (updatedBasket) {
			for (const giftBasketItemQuantity of updatedBasket.giftBasketItems) {
				const giftBasketItem: IBasketItemModel | null = await BasketItem.findById(giftBasketItemQuantity.item);
				if (giftBasketItem) {
					if (!giftBasketItem.giftBasket.includes(updatedBasket._id)) {
						giftBasketItem.giftBasket.push(updatedBasket._id);
						await giftBasketItem.save();
					}
				}
			}

			const giftBasketType: IBasketTypeModel | null = await BasketType.findById(updatedBasket.basketType);
			if (giftBasketType) {
				if (giftBasketType.giftBasket !== updatedBasket._id) {
					giftBasketType.giftBasket = updatedBasket._id;
					await giftBasketType.save();
				}
			}
		}

		return updatedBasket;
	}

	public async deleteBasket(id: string): Promise<IBasketModel | null> {
		return Basket.findByIdAndDelete(id);
	}

	public async softDeleteBasketById(id: string): Promise<IBasketModel | null> {
		return Basket.findByIdAndUpdate(id, { deleted: true }, { new: true });
	}
}

export default new BasketService();
