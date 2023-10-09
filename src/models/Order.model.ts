import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { GiftBasketType } from "./Basket.model";

export enum OrderStatus {
	CREATED = "CREATED",
	PENDING = "PENDING",
	SHIPPED = "SHIPPED",
	DELIVERED = "DELIVERED",
	CANCELLED = "CANCELLED"
}

export enum OrderPaymentType {
	CARD = "credit_card",
	ON_DELIVERY = "on_delivery"
}

export interface IOrder {
	user: ObjectId;
	email: { type: string; required: true };
	firstName: { type: string; required: true };
	lastName: { type: string; required: true };
	baskets: { basketId: ObjectId; name: string; quantity: number; type: GiftBasketType; price: number }[];
	totalPrice: number;
	orderStatus: OrderStatus;
	paymentType: OrderPaymentType;
	street: { type: string; required: true };
	city: { type: string; required: true };
	zipCode: { type: string; required: true };
	country: { type: string; required: true };
	createdAt: Date;
	updatedAt: Date;
}

export interface IOrderModel extends IOrder, Document {}

const OrderSchema: Schema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User", required: false },
		email: { type: String, required: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		baskets: [
			{
				basketId: { type: Schema.Types.ObjectId, ref: "Basket" },
				name: { type: String, required: true },
				quantity: { type: Number, required: true },
				type: { type: String, enum: Object.values(GiftBasketType), required: true },
				price: { type: Number, required: true }
			}
		],
		totalPrice: { type: Number, required: true },
		orderStatus: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.CREATED, required: true },
		paymentType: {
			type: String,
			enum: Object.values(OrderPaymentType),
			default: OrderPaymentType.ON_DELIVERY,
			required: true
		},
		street: { type: String, required: true },
		city: { type: String, required: true },
		zipCode: { type: String, required: true },
		country: { type: String, required: true, default: "Serbia" }
	},
	{ timestamps: true }
);

export default mongoose.model<IOrderModel>("Order", OrderSchema);
