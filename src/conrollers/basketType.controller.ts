import { Request, Response } from "express";
import BasketType, { IBasketType, IBasketTypeModel } from "../models/BasketType.model";
import BasketTypeService from "../services/basketType.service";

// CREATE a new basket type
export const createBasketType = async (req: Request, res: Response): Promise<void> => {
	try {
		const { name, description, price, color, isSerbian } = req.body;

		const newBasketType: IBasketTypeModel = new BasketType({ name, description, price, color, isSerbian });

		const createdBaksetType = await BasketTypeService.createBasketType(newBasketType);

		res.status(201).json({ message: "Basket type created successfully", basketType: createdBaksetType });
	} catch (error) {
		res.status(500).json({ message: "Error creating basket type", error });
	}
};

// READ all basket types, with optional query parameter for admin view
export const getBasketTypes = async (req: Request, res: Response): Promise<void> => {
	try {
		const limit = parseInt(req.query.limit as string) || 10;
		const page = parseInt(req.query.page as string) || 1;
		const sortBy = req.query.sortBy as string;
		const sortOrder = req.query.sortOrder as string;
		const name = req.query.name as string;
		const priceFrom = parseInt(req.query.priceFrom as string) || undefined;
		const priceTo = parseInt(req.query.priceTo as string) || undefined;
		const color = req.query.color as string;

		const isForAdminBasketCreation = req.query.adminBasketCreation === "true";

		const basketTypes = isForAdminBasketCreation
			? await BasketTypeService.getBasketTypesForAdmin()
			: await BasketTypeService.getBasketTypes(limit, page, sortBy, sortOrder, name, priceFrom, priceTo, color);

		res.status(200).json({ basketTypes });
	} catch (error) {
		res.status(500).json({ message: "Error retrieving basket types", error });
	}
};

// READ a single basket type by ID
export const getBasketTypeById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const basketType = await BasketTypeService.getBasketTypeById(id);

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
export const updateBasketTypeById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const updatedFields: Partial<IBasketType> = req.body;

		const updatedBasketType: IBasketTypeModel | null = await BasketTypeService.updateBasketTypeById(
			id,
			updatedFields
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
export const deleteBasketTypeById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const { deletedBasketType, basket } = await BasketTypeService.deleteBasketTypeById(id);

		if (deletedBasketType) {
			if (basket) {
				res.status(200).json({
					message: "Basket type deleted successfully",
					basketType: deletedBasketType,
					basket: basket
				});
			} else {
				res.status(400).json({ message: "Basket not found" });
			}
		} else {
			res.status(404).json({ message: "Basket item not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error deleting basket type", error });
	}
};

// SOFT DELETE basket type by id
export const softDeleteBasketTypeById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const deletedBasketType: IBasketTypeModel | null = await BasketTypeService.softDeleteBasketTypeById(id);

		if (deletedBasketType) {
			res.status(200).json({ message: "Basket type deleted succesfully", basket: deletedBasketType });
		} else {
			res.status(404).json({ message: "Basket type not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error deleting basket type", error });
	}
};

// SOFT DELETE basket type by id
export const restoreBasketTypeById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const restoredBasketType: IBasketTypeModel | null = await BasketTypeService.restoreBasketTypeById(id);

		if (restoredBasketType) {
			res.status(200).json({ message: "Basket type restored succesfully", basket: restoredBasketType });
		} else {
			res.status(404).json({ message: "Basket type not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error restoring basket type", error });
	}
};
