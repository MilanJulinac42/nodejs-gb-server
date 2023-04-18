import { Request, Response } from "express";
import { IUserModel } from "../models/User.model";
import UserService from "../services/user.service";

// READ all users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
	try {
		const users: IUserModel[] | null = await UserService.getUsers();
		res.status(200).json({ users });
	} catch (error) {
		res.status(500).json({ message: "Error getting users", error });
	}
};

// READ a single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const user: IUserModel | null = await UserService.getUserById(id);
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
		const updatedUser: IUserModel | null = await UserService.updateUserById(id, updatedFields);
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
		const deletedUser: IUserModel | null = await UserService.deleteUserById(id);
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

		const updatedUser: IUserModel | null = await UserService.softDeleteUserById(id);

		if (updatedUser) {
			res.status(200).json({ message: "User soft deleted successfully", user: updatedUser });
		} else {
			res.status(404).json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error deleting user", error });
	}
};
