import BasketItem, { IBasketItem, IBasketItemModel } from "../models/BasketItem.model";
import Basket, { IBasketModel } from "../models/Basket.model";

class BasketItemService {
	public async createBasketItem(basketItem: IBasketItem): Promise<IBasketItemModel> {
		const newBasketItem: IBasketItemModel = new BasketItem(basketItem);
		return newBasketItem.save();
	}

	public async getBasketItems(): Promise<IBasketItemModel[]> {
		return BasketItem.find();
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
}

export default new BasketItemService();
