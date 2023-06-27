import { Request, Response } from "express";
import ChartsService from "../services/charts.service";
import { format, parse } from "date-fns";

export const getSalesStatistics = async (req: Request, res: Response) => {
	try {
		const inputDateFormat = "dd-MM-yyyy";
		const startDateInput = (req.query.startDate as string) || "01-01-1970";
		const endDateInput = (req.query.endDate as string) || format(new Date(), inputDateFormat);

		const startDate = format(parse(startDateInput, inputDateFormat, new Date()), "yyyy-MM-dd");
		const endDate = format(parse(endDateInput, inputDateFormat, new Date()), "yyyy-MM-dd");

		const salesStatistics = await ChartsService.getSalesStatistics(startDate, endDate);

		res.json(salesStatistics);
	} catch (error) {
		console.error("Error fetching sales statistics:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const getTopSellingProducts = async (req: Request, res: Response) => {
	try {
		const { sortBy, limit } = req.query;

		const topSellingProducts = await ChartsService.getTopSellingProducts(
			sortBy as "quantity" | "revenue",
			parseInt(limit as string) || 5
		);

		res.json(topSellingProducts);
	} catch (error) {
		console.error("Error fetching top-selling products:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};
