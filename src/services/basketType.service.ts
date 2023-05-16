import Basket, { IBasketModel } from "../models/Basket.model";
import BasketType, { IBasketTypeModel, IBasketType } from "../models/BasketType.model";

class BasketTypeService {
	public async createBasketType(basketType: IBasketType): Promise<IBasketTypeModel> {
		const newBasketType: IBasketTypeModel = new BasketType(basketType);
		return newBasketType.save();
	}

	public async getBasketTypes(): Promise<IBasketTypeModel[]> {
		return BasketType.find();
	}

	public async getBasketTypesForAdmin(): Promise<IBasketTypeModel[]> {
		return BasketType.find({}, { name: 1, _id: 1 });
	}

	public async getBasketTypeById(id: string): Promise<IBasketTypeModel | null> {
		return BasketType.findById(id);
	}

	public async updateBasketTypeById(
		id: string,
		updatedFields: Partial<IBasketType>
	): Promise<IBasketTypeModel | null> {
		return BasketType.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });
	}

	public async deleteBasketTypeById(
		id: string
	): Promise<{ deletedBasketType: IBasketTypeModel | null; basket: IBasketModel | null }> {
		const deletedBasketType: IBasketTypeModel | null = await BasketType.findByIdAndDelete(id);

		if (deletedBasketType) {
			const basket: IBasketModel | null = await Basket.findByIdAndUpdate(
				deletedBasketType.giftBasket,
				{ $pull: { basketType: deletedBasketType._id } },
				{ new: true }
			);

			return { deletedBasketType, basket };
		}
		return { deletedBasketType: null, basket: null };
	}

	public async softDeleteBasketTypeById(id: string): Promise<IBasketTypeModel | null> {
		return BasketType.findByIdAndUpdate(id, { deleted: true }, { new: true });
	}
}

export default new BasketTypeService();
