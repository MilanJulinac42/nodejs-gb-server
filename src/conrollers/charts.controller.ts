import { Request, Response } from "express";
import ChartsService from "../services/charts.service";

export const getSalesStatistics = async (req: Request, res: Response) => {
	try {
		const salesStatistics = await ChartsService.getSalesStatistics();

		res.json(salesStatistics);
	} catch (error) {
		console.error("Error fetching sales statistics:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
