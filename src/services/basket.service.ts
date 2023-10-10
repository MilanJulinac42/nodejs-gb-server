import mongoose from "mongoose";
import Basket, { IBasket, IBasketModel } from "../models/Basket.model";
import BasketItem, { IBasketItemModel } from "../models/BasketItem.model";
import BasketType, { IBasketTypeModel } from "../models/BasketType.model";

interface CreateBasketInput {
	name: string;
	description: string;
	price: number;
	profit: number;
	inStock: number;
	type: string;
	giftBasketItems: { item: string; quantity: number }[];
	basketType: string;
	isSerbian: boolean;
	imageUrl: string;
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

	public async getAllBaskets(
		limit: number,
		page: number,
		sortBy: string,
		sortOrder: string,
		name?: string,
		priceFrom?: number,
		priceTo?: number,
		profitFrom?: number,
		profitTo?: number,
		type?: string,
		inStockFrom?: number,
		inStockTo?: number,
		soldFrom?: number,
		soldTo?: number
	): Promise<{ baskets: IBasketModel[] | null; total: number } | null> {
		const query = Basket.find();

		if (name) {
			query.where("name", { $regex: name, $options: "i" });
		}

		if (priceFrom !== undefined && priceTo !== undefined) {
			query.where("price").gte(priceFrom).lte(priceTo);
		} else if (priceFrom !== undefined) {
			query.where("price").gte(priceFrom);
		} else if (priceTo !== undefined) {
			query.where("price").lte(priceTo);
		}

		if (profitFrom !== undefined && profitTo !== undefined) {
			query.where("profit").gte(profitFrom).lte(profitTo);
		} else if (profitFrom !== undefined) {
			query.where("profit").gte(profitFrom);
		} else if (profitTo !== undefined) {
			query.where("profit").lte(profitTo);
		}

		if (inStockFrom !== undefined && inStockTo !== undefined) {
			query.where("inStock").gte(inStockFrom).lte(inStockTo);
		} else if (inStockFrom !== undefined) {
			query.where("inStock").gte(inStockFrom);
		} else if (inStockTo !== undefined) {
			query.where("inStock").lte(inStockTo);
		}

		if (soldFrom !== undefined && soldTo !== undefined) {
			query.where("sold").gte(soldFrom).lte(soldTo);
		} else if (soldFrom !== undefined) {
			query.where("sold").gte(soldFrom);
		} else if (soldTo !== undefined) {
			query.where("sold").lte(soldTo);
		}

		if (type) {
			query.where("type", type);
		}

		const totalQuery = Basket.find();

		if (name) {
			totalQuery.where("name", { $regex: name, $options: "i" });
		}

		if (priceFrom !== undefined && priceTo !== undefined) {
			totalQuery.where("price").gte(priceFrom).lte(priceTo);
		} else if (priceFrom !== undefined) {
			totalQuery.where("price").gte(priceFrom);
		} else if (priceTo !== undefined) {
			totalQuery.where("price").lte(priceTo);
		}

		if (profitFrom !== undefined && profitTo !== undefined) {
			totalQuery.where("profit").gte(profitFrom).lte(profitTo);
		} else if (profitFrom !== undefined) {
			totalQuery.where("profit").gte(profitFrom);
		} else if (profitTo !== undefined) {
			totalQuery.where("profit").lte(profitTo);
		}

		if (inStockFrom !== undefined && inStockTo !== undefined) {
			totalQuery.where("inStock").gte(inStockFrom).lte(inStockTo);
		} else if (inStockFrom !== undefined) {
			totalQuery.where("inStock").gte(inStockFrom);
		} else if (inStockTo !== undefined) {
			totalQuery.where("inStock").lte(inStockTo);
		}

		if (soldFrom !== undefined && soldTo !== undefined) {
			totalQuery.where("sold").gte(soldFrom).lte(soldTo);
		} else if (soldFrom !== undefined) {
			totalQuery.where("sold").gte(soldFrom);
		} else if (soldTo !== undefined) {
			totalQuery.where("sold").lte(soldTo);
		}

		if (type) {
			query.where("type", type);
		}

		const total = await totalQuery.countDocuments();
		query
			.populate("giftBasketItems.item", "name price")
			.populate("basketType", "name")
			.skip((page - 1) * limit)
			.limit(limit);

		if (sortOrder === "desc") {
			query.sort({ [sortBy]: -1 });
		} else {
			query.sort({ [sortBy]: 1 });
		}

		const baskets = await query.exec();

		return { baskets, total };
	}

	public async getBasketById(id: string): Promise<IBasketModel | null> {
		return Basket.findById(id).populate("giftBasketItems.item", "name price").populate("basketType", "name price");
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

	public async restoreBasketById(id: string): Promise<IBasketModel | null> {
		return Basket.findByIdAndUpdate(id, { deleted: false }, { new: true });
	}

	public async getSettingsBaskets(): Promise<IBasketModel[] | null> {
		return Basket.find({}, "basketId, imageUrl, name, type, price");
	}
}

export default new BasketService();
