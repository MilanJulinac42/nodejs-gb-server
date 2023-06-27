import { Router } from "express";
import { getSalesStatistics, getTopSellingProducts, getRevenueByCategory } from "../conrollers/charts.controller";

const router: Router = Router();

router.get("/sales-statistics", getSalesStatistics);

router.get("/top-selling-products", getTopSellingProducts);

router.get("/revenue-by-category", getRevenueByCategory);

export default router;
