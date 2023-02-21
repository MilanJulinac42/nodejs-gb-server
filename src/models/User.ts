import mongoose, { Document, Schema } from "mongoose";
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
}

export interface IUserModel extends IUser, Document {
	hashPassword(password: string): Promise<string>;
	checkPassword(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema(
	{
		firstName: { type: "string", required: true },
		lastName: { type: "string", required: true },
		email: { type: "string", required: true },
		passwordHash: { type: "string", required: true },
		deleted: { type: "boolean", default: false },
		role: { type: "string", enum: Object.values(UserRole), default: UserRole.CUSTOMER }
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
