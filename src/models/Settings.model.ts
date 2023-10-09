import mongoose, { Document, ObjectId, Schema } from "mongoose";
import { GiftBasketType } from "./Basket.model";

export interface ISettings {
	heroTitle: string;
	giftBasketsGallery: { basketId: ObjectId; name: string; type: GiftBasketType; price: number }[];
}

export interface ISettingsModel extends ISettings, Document {}

const SettingsSchema: Schema = new Schema({
	heroTitle: { type: String, required: true },
	giftBasketsGallery: [
		{
			basketId: { type: Schema.Types.ObjectId, ref: "Basket" },
			name: { type: String, required: true },
			type: { type: String, enum: Object.values(GiftBasketType), required: true },
			price: { type: Number, required: true }
		}
	]
});

export default mongoose.model<ISettingsModel>("Settings", SettingsSchema);