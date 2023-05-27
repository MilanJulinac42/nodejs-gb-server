import mongoose, { Document, ObjectId, Schema } from "mongoose";

export enum OrderStatus {
	CREATED = "created",
	PENDING = "pending",
	SHIPPED = "shipped",
	DELIVERED = "delivered",
	CANCELLED = "cancelled"
}

export enum OrderPaymentType {
	CARD = "credit_card",
	ON_DELIVERY = "on_delivery"
}

export interface IOrder {
	user: ObjectId;
	email: { type: String; required: true };
	firstName: { type: String; required: true };
	lastName: { type: String; required: true };
	baskets: { basketId: ObjectId; quantity: number }[];
	totalPrice: number;
	orderStatus: OrderStatus;
	paymentType: OrderPaymentType;
	street: { type: String; required: true };
	city: { type: String; required: true };
	zipCode: { type: String; required: true };
	country: { type: String; required: true };
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
			{ basketId: { type: Schema.Types.ObjectId, ref: "Basket" }, quantity: { type: Number, required: true } }
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
