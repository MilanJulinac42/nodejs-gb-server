import mongoose, { Document, ObjectId, Schema } from "mongoose";
import bcrypt from "bcrypt";

enum UserRole {
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
	orders: ObjectId[];
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
		orders: [{ type: Schema.Types.ObjectId, ref: "Order" }]
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

export default mongoose.model<IUserModel>("User", UserSchema);
