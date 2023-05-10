import { Request, Response } from "express";
import { uploadImageToS3 } from "../services/imageUpload.service";
import { IUser } from "../models/User.model";

interface AuthRequest extends Request {
	user?: IUser;
}

export const imageUpload = async (req: AuthRequest, res: Response) => {
	const folder = "basket/";
	const file = req.file;

	if (!file) {
		res.status(400).json({ error: "No file provided" });
		return;
	}

	try {
		const response = await uploadImageToS3(folder, file);
		console.log(response);
	} catch (err) {
		console.log("Error: ", err);
	}

	res.status(200).json({ message: "Image uploaded successfully" });
};
