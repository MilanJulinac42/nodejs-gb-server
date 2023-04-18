import { Request, Response } from "express";
import AuthService from "../services/auth.service";

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { firstName, lastName, email, password, confirmPassword } = req.body;

		const result = await AuthService.registerUser(firstName, lastName, email, password, confirmPassword);

		if (result) {
			res.status(201).json({ token: result.token });
		} else {
			res.status(400).json({ message: "User already exists or passwords do not match" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error registering user", error });
	}
};

// Log in an existing user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;

		const result = await AuthService.loginUser(email, password);

		if (result) {
			res.cookie("jwt", result.token, {
				httpOnly: true,
				secure: false,
				sameSite: "none",
				maxAge: 60 * 60 * 1000
			}); // Expires after 1 hour
			res.status(200).json({ message: "User logged in successfully", token: result.token });
		} else {
			res.status(401).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error logging in user", error });
	}
};

// Logout user
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
	try {
		res.clearCookie("jwt");

		res.status(200).json({ message: "Logout successful" });
	} catch (error) {
		res.status(500).json({ message: "Error logging out", error });
	}
};
