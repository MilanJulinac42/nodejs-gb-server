import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User.model";

interface AuthRequest extends Request {
	user?: IUser;
}

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

interface ITokenPayload {
	id: string;
	email: string;
	role: string;
	exp: number;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
	try {
		const token = req.cookies["jwt"];

		// Check if token exists
		if (!token) {
			throw new Error("Unauthorized1");
		}

		// Verify token
		const decodedToken = jwt.verify(token, JWT_SECRET_KEY) as ITokenPayload;

		// Check if token is expired
		if (decodedToken.exp * 1000 < Date.now()) {
			throw new Error("Unauthorized2");
		}

		// Get user from decoded token
		const user = await User.findById(decodedToken.id);
		if (!user) {
			throw new Error("Unauthorized3");
		}

		// Add user to request object
		req.user = user;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).json({ message: "Unauthorized4" });
	}
};

export default authMiddleware;
