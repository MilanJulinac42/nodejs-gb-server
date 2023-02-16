import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IBasketItem {
	name: string;
	description: string;
	price: number;
	weight: number;
	giftBasket: ObjectId[];
	isSerbian: boolean;
}

export interface IBasketItemModel extends IBasketItem, Document {}

const BasketItemSchema: Schema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	weight: { type: Number, required: true },
	giftBasket: [{ type: Schema.Types.ObjectId, ref: "Basket" }],
	isSerbian: { type: Boolean, required: true, default: false }
});

export default mongoose.model<IBasketItemModel>("BasketItem", BasketItemSchema);
