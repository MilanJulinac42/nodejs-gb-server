import mongoose, { Document, Schema } from "mongoose";

export interface IBasketType {
  name: string;
  description: string;
  price: number;
  isSerbian: boolean;
}

export interface IBasketTypeModel extends IBasketType, Document {}

const BaksetTypeSchema: Schema = new Schema({
  name: {type: String, required: true},
  description: { type: String, required: true },
  price: {type: Number, required: true},
  isSerbian: {type: Boolean, required: true, default: false}
});

export default mongoose.model<IBasketTypeModel>("BasketType", BaksetTypeSchema);
