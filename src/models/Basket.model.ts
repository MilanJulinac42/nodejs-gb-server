import mongoose, { Document, ObjectId, Schema } from "mongoose";

enum GiftBasketType {
	COORPORATIVE = "COORPORATIVE",
	HAPPY_BIRTHDAY = "HAPPY_BIRTHDAY",
	LOVERS = "LOVERS",
	OTHER = "OTHER"
}

export interface IBasketItemQuantity {
	item: ObjectId;
	quantity: number;
}

export interface IBasket {
	name: string;
	description: string;
	price: number;
	profit: number;
	inStock: number;
	sold: number;
	liked: number;
	type: GiftBasketType;
	giftBasketItems: IBasketItemQuantity[];
	basketType: ObjectId;
	isSerbian: boolean;
	deleted: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface IBasketModel extends IBasket, Document {}

const BasketSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		profit: { type: Number, required: true },
		inStock: { type: Number, required: false, default: 0 },
		sold: { type: Number, required: false, default: 0 },
		liked: { type: Number, required: false, default: 0 },
		type: {
			type: String,
			required: true,
			enum: [
				GiftBasketType.COORPORATIVE,
				GiftBasketType.HAPPY_BIRTHDAY,
				GiftBasketType.LOVERS,
				GiftBasketType.OTHER
			],
			default: GiftBasketType.OTHER
		},
		giftBasketItems: [
			{
				item: { type: Schema.Types.ObjectId, ref: "BasketItem" },
				quantity: { type: Number, required: true }
			}
		],
		basketType: { type: Schema.Types.ObjectId, ref: "BasketType" },
		isSerbian: { type: Boolean, required: true, default: false },
		deleted: { type: Boolean, required: true, default: false }
	},
	{ timestamps: true }
);

export default mongoose.model<IBasketModel>("Basket", BasketSchema);
