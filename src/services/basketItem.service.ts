import BasketItem, { IBasketItem, IBasketItemModel } from "../models/BasketItem.model";
import Basket, { IBasketModel } from "../models/Basket.model";

class BasketItemService {
	public async createBasketItem(basketItem: IBasketItem): Promise<IBasketItemModel> {
		const newBasketItem: IBasketItemModel = new BasketItem(basketItem);
		return newBasketItem.save();
	}

	public async getBasketItems(
		limit: number,
		page: number,
		sortBy: string,
		sortOrder: string,
		name?: string,
		priceFrom?: number,
		priceTo?: number
	): Promise<{ basketItems: IBasketItemModel[] | null; total: number } | null> {
		const query = BasketItem.find();

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

		const totalQuery = BasketItem.find();

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

		query.skip((page - 1) * limit).limit(limit);
		const total = await totalQuery.countDocuments();

		if (sortOrder === "desc") {
			query.sort({ [sortBy]: -1 });
		} else {
			query.sort({ [sortBy]: 1 });
		}

		const basketItems = await query.exec();

		return { basketItems, total };
	}

	public async getBasketItemsForAdmin(): Promise<IBasketItemModel[]> {
		return BasketItem.find({}, { name: 1, _id: 1, price: 1 });
	}

	public async getBasketItemById(id: string): Promise<IBasketItemModel | null> {
		return BasketItem.findById(id);
	}

	public async updateBasketItemById(
		id: string,
		updatedFields: Partial<IBasketItem>
	): Promise<IBasketItemModel | null> {
		return BasketItem.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });
	}

	public async deleteBasketItemById(
		id: string
	): Promise<{ deletedBasketItem: IBasketItemModel | null; basket: IBasketModel | null }> {
		const deletedBasketItem: IBasketItemModel | null = await BasketItem.findByIdAndDelete(id);

		if (deletedBasketItem) {
			const basket: IBasketModel | null = await Basket.findByIdAndUpdate(
				deletedBasketItem.giftBasket,
				{ $pull: { basketItems: deletedBasketItem._id } },
				{ new: true }
			);
			return { deletedBasketItem, basket };
		}

		return { deletedBasketItem: null, basket: null };
	}

	public async softDeleteBasketItemById(id: string): Promise<IBasketItemModel | null> {
		return BasketItem.findByIdAndUpdate(id, { deleted: true }, { new: true });
	}

	public async restoreBasketItemById(id: string): Promise<IBasketItemModel | null> {
		return BasketItem.findByIdAndUpdate(id, { deleted: false }, { new: true });
	}
}

export default new BasketItemService();
