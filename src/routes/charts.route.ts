import express from "express";
import { getSalesStatistics } from "../conrollers/charts.controller";

const router = express.Router();

router.get("/sales-statistics", getSalesStatistics);

export default router;
