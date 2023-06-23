import Basket, { IBasketModel } from "../models/Basket.model";
import BasketType, { IBasketTypeModel, IBasketType } from "../models/BasketType.model";

class BasketTypeService {
	public async createBasketType(basketType: IBasketType): Promise<IBasketTypeModel> {
		const newBasketType: IBasketTypeModel = new BasketType(basketType);
		return newBasketType.save();
	}

	public async getBasketTypes(
		limit: number,
		page: number,
		sortBy: string,
		sortOrder: string,
		name?: string,
		priceFrom?: number,
		priceTo?: number,
		color?: string
	): Promise<{ basketTypes: IBasketTypeModel[] | null; total: number } | null> {
		const query = BasketType.find();

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

		if (color) {
			query.where("color", color);
		}

		const totalQuery = BasketType.find();

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

		if (color) {
			totalQuery.where("color", color);
		}

		const total = await totalQuery.countDocuments();

		query.skip((page - 1) * limit).limit(limit);

		if (sortOrder === "desc") {
			query.sort({ [sortBy]: -1 });
		} else {
			query.sort({ [sortBy]: 1 });
		}

		const basketTypes = await query.exec();

		return { basketTypes, total };
	}

	public async getBasketTypesForAdmin(): Promise<IBasketTypeModel[]> {
		return BasketType.find({}, { name: 1, _id: 1, price: 1 });
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
