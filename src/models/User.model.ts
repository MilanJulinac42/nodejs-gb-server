import mongoose, { Document, ObjectId, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IShoppingCart } from "./ShoppingCart.model";
import Stripe from 'stripe';

const stripe = new Stripe('your_stripe_api_key', {apiVersion: '2022-11-15'});

export enum UserRole {
	ADMIN = "admin",
	CUSTOMER = "customer"
}

export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	passwordHash: string;
	deleted: boolean;
	role: UserRole;
	paymentIntents: string[];
	stripeCustomerId: string;
	orders: ObjectId[];
	shoppingCart: ObjectId | IShoppingCart;
	createdAt: Date;
	updatedAt: Date;
}

export interface IUserModel extends IUser, Document {
	hashPassword(password: string): Promise<string>;
	checkPassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true },
		passwordHash: { type: String, required: true },
		deleted: { type: Boolean, default: false },
		role: { type: String, enum: Object.values(UserRole), default: UserRole.CUSTOMER },
		paymentIntents: [{ type: Schema.Types.String }],
		stripeCustomerId: { type: String },
		orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
		shoppingCart: { type: Schema.Types.ObjectId, ref: "ShoppingCart" },
	},
	{ timestamps: true }
);

UserSchema.methods.hashPassword = async function (password: string): Promise<string> {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	return hashedPassword;
};

UserSchema.methods.checkPassword = async function (password: string): Promise<boolean> {
	const isMatch = await bcrypt.compare(password, this.passwordHash);
	return isMatch;
};

UserSchema.methods.createStripeCustomer = async function () {
  const customer = await stripe.customers.create({
    email: this.email,
  });
  this.stripeCustomerId = customer.id;
  await this.save();
  return customer;
};

UserSchema.methods.createPayment = async function (amount: number, currency: string, paymentMethodId: string) {
  if (!this.stripeCustomerId) {
    throw new Error('User does not have a Stripe Customer ID');
  }

  // Create a payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount, // Amount should be in the smallest currency unit (e.g., cents)
    currency: currency, // The currency code, like 'usd'
    customer: this.stripeCustomerId,
    payment_method: paymentMethodId, // The payment method ID (obtained from the client-side, e.g., using Stripe Elements)
    off_session: false, // To indicate that the payment is not a recurring or future-dated payment
    confirm: true, // To immediately confirm the payment intent
  });

  // Handle the payment result
  if (paymentIntent.status === 'succeeded') {
    // Payment is successful, you can update the user's paymentIntents and other data as needed
    this.paymentIntents.push(paymentIntent.id);
    await this.save();
    return { success: true, message: 'Payment successful', paymentIntent };
  } else {
    // Payment failed, handle the error
    return { success: false, message: 'Payment failed', error: paymentIntent.last_payment_error };
  }
};

export default mongoose.model<IUserModel>("User", UserSchema);
