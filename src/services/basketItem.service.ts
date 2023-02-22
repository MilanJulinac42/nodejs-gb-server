import Basket, { IBasketModel } from "../models/Basket.model";
import BasketItem, { IBasketItem, IBasketItemModel } from "../models/BasketItem.model";

// CREATE a new basket item
export const createBasketItem = async ({ name, description, price, weight, isSerbian }: IBasketItem): Promise<IBasketItemModel> => {
	try {
		const newBasketItem: IBasketItemModel = new BasketItem({ name, description, price, weight, isSerbian });

		await newBasketItem.save();
		return newBasketItem;
	} catch (error) {
		throw new Error(`Error creating basket item: ${error}`);
	}
};

// READ all basket items
export const getBasketItems = async (): Promise<IBasketItemModel[]> => {
	try {
		const basketItems: IBasketItemModel[] = await BasketItem.find();

		return basketItems;
	} catch (error) {
		throw new Error(`Error retrieving basket items: ${error}`);
	}
};

// READ a single basket item by ID
export const getBasketItemById = async (id: string): Promise<IBasketItemModel | null> => {
	try {
		const basketItem: IBasketItemModel | null = await BasketItem.findById(id);

		return basketItem;
	} catch (error) {
		throw new Error(`Error retrieving basket item: ${error}`);
	}
};

// UPDATE a basket item by ID
export const updateBasketItemById = async (id: string, updatedFields: Partial<IBasketItem>): Promise<IBasketItemModel | null> => {
	try {
		const updatedBasketItem: IBasketItemModel | null = await BasketItem.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });

		return updatedBasketItem;
	} catch (error) {
		throw new Error(`Error updating basket item: ${error}`);
	}
};

// DELETE a basket item by ID
export const deleteBasketItemById = async (id: string): Promise<{ deletedBasketItem: IBasketItemModel, basket: IBasketModel } | null> => {
	try {
		const deletedBasketItem: IBasketItemModel | null = await BasketItem.findByIdAndDelete(id);

		if (deletedBasketItem) {
			const basket: IBasketModel | null = await Basket.findByIdAndUpdate(deletedBasketItem.giftBasket, { $pull: { basketItems: deletedBasketItem._id } }, { new: true });

			if (basket) {
				return { deletedBasketItem, basket };
			} else {
				throw new Error("Basket not found");
			}
		} else {
			throw new Error("Basket item not found");
		}
	} catch (error) {
		throw new Error(`Error deleting basket item: ${error}`);
	}
};

// SOFT DELETE basket item by id
export const softDeleteBasketItemById = async (id: string): Promise<IBasketItemModel | null> => {
	try {
		const deletedBasketItem: IBasketItemModel | null = await BasketItem.findByIdAndUpdate(id, { deleted: true }, { new: true });

		return deletedBasketItem;
	} catch (error) {
		throw new Error(`Error deleting basket item: ${error}`);
	}
};
