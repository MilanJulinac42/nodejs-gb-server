import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUserModel, UserRole } from "../models/User.model";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

class AuthService {
	public async registerUser(
		firstName: string,
		lastName: string,
		email: string,
		password: string,
		confirmPassword: string
	): Promise<{ token: string } | null> {
		// Check if user already exists
		const userExists = await User.findOne({ email });
		if (userExists) {
			return null;
		}

		// Check if passwords match
		if (password !== confirmPassword) {
			return null;
		}

		// Hash password
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		// Create new user
		const newUser: IUserModel = new User({
			firstName,
			lastName,
			email,
			passwordHash: hashedPassword,
			deleted: false,
			role: UserRole.ADMIN,
		});
		const savedUser = await newUser.save();

		// Create and sign JWT
		const token = jwt.sign({ id: savedUser._id, role: savedUser.role, email: savedUser.email }, JWT_SECRET_KEY);

		return { token };
	}

	public async loginUser(email: string, password: string): Promise<{ token: string } | null> {
		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return null;
		}

		// Check password
		const isMatch = await bcrypt.compare(password, user.passwordHash);
		if (!isMatch) {
			return null;
		}

		// Create and sign JWT
		const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET_KEY, {
			expiresIn: "1h"
		});

		return { token };
	}
}

export default new AuthService();
