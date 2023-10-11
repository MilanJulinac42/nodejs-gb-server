import { Request, Response } from "express";
import SettingsService from "../services/settings.service";
import { ISettingsModel } from "../models/Settings.model";

// CREATE settings
export const createSettings = async (req: Request, res: Response): Promise<void> => {
	try {
		const { heroTitle, giftBasketsGallery } = req.body;

		const savedSettings = await SettingsService.createSettings({
			heroTitle,
			giftBasketsGallery
		});

		res.status(201).json({ message: "Settings created", settings: savedSettings });
	} catch (error) {
		res.status(500).json({ message: "Error creating settings", error });
	}
};

// READ settings
export const getSettings = async (req: Request, res: Response): Promise<void> => {
	try {
		const settings: ISettingsModel | null = await SettingsService.getSettings();

		if (settings) {
			res.status(200).json({ settings });
		} else {
			res.status(404).json({ message: "Settings not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error retrieving settings", error });
	}
};

// UPDATE settings
export const updateSettings = async (req: Request, res: Response): Promise<void> => {
	try {
		const { heroTitle, giftBasketsGallery } = req.body;

		const updatedFields: Partial<ISettingsModel> = {
			...(heroTitle && { heroTitle }),
			...(giftBasketsGallery && { giftBasketsGallery })
		};

		const updatedSettings: ISettingsModel | null = await SettingsService.updateSettings(updatedFields);

		if (updatedSettings) {
			res.status(200).json({ message: "Settings updated successfully", settings: updatedSettings });
		} else {
			res.status(404).json({ message: "Settings not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error updating settings", error });
	}
};
