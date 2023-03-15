import User, { IUser, IUserModel } from "../models/User.model";

class UserService {
	public async getUsers(): Promise<IUserModel[] | null> {
		return User.find();
	}

	public async getUserById(id: string): Promise<IUserModel | null> {
		return User.findById(id);
	}

	public async updateUserById(id: string, updatedFields: Partial<IUser>): Promise<IUserModel | null> {
		return User.findByIdAndUpdate(id, { $set: updatedFields }, { new: true });
	}

	public async deleteUserById(id: string): Promise<IUserModel | null> {
		return User.findByIdAndDelete(id);
	}

	public async softDeleteUserById(id: string): Promise<IUserModel | null> {
		return User.findByIdAndUpdate(id, { deleted: true }, { new: true });
	}
}

export default new UserService();
