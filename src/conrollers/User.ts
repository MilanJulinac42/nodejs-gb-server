import { Request, Response } from "express";
import User, { IUserModel } from "../models/User";

// REGISTER a new user
export const redisterUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { firstName, lastName, email, password, role } = req.body;

		const newUser: IUserModel = new User({
			firstName,
			lastName,
			email,
			role,
			deleted: false
		});

		newUser.passwordHash = await newUser.hashPassword(password);

		const savedUser = await newUser.save();

		res.status(201).json({ message: "User created", user: savedUser });
	} catch (error) {
		res.status(500).json({ message: "Error creating user", error });
	}
};

// LOGIN a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password } = req.body;

		const user: IUserModel | null = await User.findOne({ email });

		if (user && (await user.checkPassword(password))) {
			res.status(200).json({ message: "User logged in", user });
		} else {
			res.status(401).json({ message: "Invalid username or password" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error logging in user", error });
	}
};

// READ all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users: IUserModel[] = await User.find();
		res.status(200).json({ users });
	} catch (error) {
		res.status(500).json({ message: "Error getting users", error });
	}
};

// READ a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const user: IUserModel | null = await User.findById(id);
		if (user) {
			res.status(200).json({ user });
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error getting user", error });
	}
};

// UPDATE a user by ID
export const updateUserById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const updatedFields: Partial<IUserModel> = req.body;
		const updatedUser: IUserModel | null = await User.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });
		if (updatedUser) {
			res.status(200).json({ message: "User updated successfully", user: updatedUser });
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error updating user", error });
	}
};

// DELETE a user by ID
export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const deletedUser: IUserModel | null = await User.findByIdAndDelete(id);
		if (deletedUser) {
			res.status(200).json({ message: "User deleted successfully", user: deletedUser });
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error deleting user", error });
	}
};

// SOFT DELETE a user by id
export const softDeleteUserById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const updatedFields = { deleted: true };
		const updatedUser: IUserModel | null = await User.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });

		if (updatedUser) {
			res.status(200).json({ message: "User soft deleted successfully", user: updatedUser });
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error deleting user", error });
	}
};
