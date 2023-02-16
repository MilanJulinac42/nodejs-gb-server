import mongoose, { Document, ObjectId, Schema } from "mongoose";

enum BasketType {
	COORPORATIVE = "COORPORATIVE",
	HAPPY_BIRTHDAY = "HAPPY_BIRTHDAY",
	LOVERS = "LOVERS",
	OTHER = "OTHER"
}

export interface IBasket {
	name: string;
  description: string;
	price: number;
  profit: number;
	type: BasketType;
	giftBasketItems: ObjectId[];
	isSerbian: boolean;
}

export interface IBasketModel extends IBasket, Document {}

const BasketSchema: Schema = new Schema({
	name: { type: String, required: true },
  description: { type: String, required: true },
	price: { type: Number, required: true },
  profit: {type: Number, required: true},
	type: { type: String, required: true, enum: [BasketType.COORPORATIVE, BasketType.HAPPY_BIRTHDAY, BasketType.LOVERS, BasketType.OTHER], default: BasketType.OTHER },
	giftBasketItems: [{type: Schema.Types.ObjectId, ref: 'BasketItem'}],
	isSerbian: { type: Boolean, required: true, default: false }
});

export default mongoose.model<IBasketModel>("Basket", BasketSchema);
