import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface IShoppingCartItem {
	basket: ObjectId | string;
	quantity: number;
}

export interface IShoppingCart {
	user: ObjectId;
	items: IShoppingCartItem[];
	createdAt: Date;
	updatedAt: Date;
}

export interface IShoppingCartModel extends IShoppingCart, Document {}

const ShoppingCartItemSchema: Schema = new Schema({
	basket: { type: Schema.Types.ObjectId, ref: "Basket", required: true },
	quantity: { type: Number, required: true, min: 1 }
});

const ShoppingCartSchema: Schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: true },
		items: [ShoppingCartItemSchema]
	},
	{ timestamps: true }
);

export default mongoose.model<IShoppingCartModel>("ShoppingCart", ShoppingCartSchema);
