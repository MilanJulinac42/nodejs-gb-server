import Settings, { ISettings, ISettingsModel } from "../models/Settings.model";

interface CreateSettingsInput {
	heroTitle: string;
	giftBasketsGallery: { basketId: string; name: string; type: string; price: number }[];
}

class SettingsService {
	public async createSettings(settings: CreateSettingsInput): Promise<ISettingsModel> {
		const newSettings: ISettingsModel = new Settings(settings);
		const savedSettings = await newSettings.save();
		return savedSettings;
	}

	public async getSettings(): Promise<ISettingsModel | null> {
		return Settings.findOne({});
	}

	public async updateSettings(updatedFields: Partial<ISettings>): Promise<ISettingsModel | null> {
		const existingSettings = await Settings.findOne({});
		if (!existingSettings) {
			return null;
		}

		Object.assign(existingSettings, updatedFields);

		const updatedSettings = await existingSettings.save();

		return updatedSettings;
	}
}

export default new SettingsService();
