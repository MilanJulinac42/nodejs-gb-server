import mongoose, { Document, ObjectId, Schema } from "mongoose";

export enum OrderStatus {
	CREATED = "created",
	PENDING = "admin",
	SHIPPED = "customer",
	DELIVERED = "delivered",
	CANCELLED = "cancelled"
}

export enum OrderPaymentType {
	CARD = "credit_card",
	ON_DELIVERY = "on_delivery"
}

export interface IOrder {
	user: ObjectId;
	email: { type: String; required: false };
	firstName: { type: String; required: false };
	lastName: { type: String; required: false };
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
		email: { type: String, required: false },
		firstName: { type: String, required: false },
		lastName: { type: String, required: false },
		baskets: [
			{ basketId: { type: Schema.Types.ObjectId, ref: "Basket" }, quantity: { type: Number, required: true } }
		],
		totalPrice: { type: Number, required: true },
		stripePaymentIntentId: { type: String, required: true },
		orderStatus: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.CREATED, required: true },
		paymentType: {
			type: String,
			enum: Object.values(OrderPaymentType),
			default: OrderPaymentType.ON_DELIVERY,
			required: true
		},
		street: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		zipCode: { type: String, required: true },
		country: { type: String, required: true, default: "Serbia" }
	},
	{ timestamps: true }
);

export default mongoose.model<IOrderModel>("Order", OrderSchema);
