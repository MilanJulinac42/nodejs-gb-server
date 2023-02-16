import { Request, Response, NextFunction } from "express";
import BasketType, { IBasketType, IBasketTypeModel } from "../models/BasketType";

// CREATE a new basket type
export const createBasketType = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { name, description, price, isSerbian } = req.body;

		const newBasketType: IBasketTypeModel = new BasketType({ name, description, price, isSerbian });

		await newBasketType.save();

		res.status(201).json({ message: "Basket type created successfully", basketType: newBasketType });
	} catch (error) {
		res.status(500).json({ message: "Error creating basket type", error });
	}
};

// READ all basket types
export const getBasketTypes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const basketTypes: IBasketTypeModel[] = await BasketType.find();

		res.status(200).json({ basketTypes });
	} catch (error) {
		res.status(500).json({ message: "Error retrieving basket types", error });
	}
};

// READ a single basket type by ID
export const getBasketTypeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = req.params;

		const basketType: IBasketTypeModel | null = await BasketType.findById(id);

		if (basketType) {
			res.status(200).json({ basketType });
		} else {
			res.status(404).json({ message: "Basket type not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error retrieving basket type", error });
	}
};

// UPDATE a basket type by ID
export const updateBasketTypeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    const updatedFields: Partial<IBasketType> = req.body;

    const updatedBasketType: IBasketTypeModel | null = await BasketType.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    if (updatedBasketType) {
      res.status(200).json({ message: "Basket type updated successfully", basketType: updatedBasketType });
    } else {
      res.status(404).json({ message: "Basket type not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating basket type", error });
  }
};


// DELETE a basket type by ID
export const deleteBasketTypeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const { id } = req.params;

		const deletedBasketType: IBasketTypeModel | null = await BasketType.findByIdAndDelete(id);

		if (deletedBasketType) {
			res.status(200).json({ message: "Basket type deleted successfully", basketType: deletedBasketType });
		} else {
			res.status(404).json({ message: "Basket type not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error deleting basket type", error });
	}
};
