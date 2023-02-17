import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IBasketType {
	name: string;
	description: string;
	price: number;
	color: string;
	giftBasket: ObjectId[];
	isSerbian: boolean;
	deleted: boolean;
}

export interface IBasketTypeModel extends IBasketType, Document {}

const BaksetTypeSchema: Schema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	color: { type: String, required: true },
	giftBasket: [{ type: Schema.Types.ObjectId, ref: "Basket" }],
	isSerbian: { type: Boolean, required: true, default: false },
	deleted: { type: Boolean, required: true, default: false }
});

export default mongoose.model<IBasketTypeModel>("BasketType", BaksetTypeSchema);
