import { Router } from "express";
import { getSalesStatistics, getTopSellingProducts } from "../conrollers/charts.controller";

const router: Router = Router();

router.get("/sales-statistics", getSalesStatistics);

router.get("/top-selling-products", getTopSellingProducts);

export default router;
