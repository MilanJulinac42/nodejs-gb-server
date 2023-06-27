import OrderModel from "../models/Order.model";

class ChartsService {
	public async getSalesStatistics(startDate: string, endDate: string) {
		try {
			const salesStatistics = await OrderModel.aggregate([
				{
					$match: {
						createdAt: {
							$gte: new Date(new Date(startDate).setHours(0, 0, 0)),
							$lt: new Date(new Date(endDate).setHours(23, 59, 59))
						}
					}
				},
				{
					$group: {
						_id: null,
						totalSales: { $sum: "$totalPrice" },
						orderCount: { $sum: 1 },
						averageOrderValue: { $avg: "$totalPrice" }
					}
				}
			]);

			return salesStatistics[0];
		} catch (error) {
			console.error("Error fetching sales statistics:", error);
			throw new Error("Internal server error");
		}
	}

	public async getTopSellingProducts(sortBy: "quantity" | "revenue", limit: number = 5) {
		try {
			const aggregationPipeline: any[] = [
				{
					$unwind: "$baskets"
				},
				{
					$group: {
						_id: "$baskets._id",
						basketName: { $first: "$baskets.name" },
						totalQuantity: { $sum: "$baskets.quantity" },
						totalRevenue: { $sum: { $multiply: ["$baskets.quantity", "$totalPrice"] } }
					}
				},
				{
					$sort: {
						[sortBy === "quantity" ? "totalQuantity" : "totalRevenue"]: -1
					}
				},
				{
					$limit: limit
				}
			];

			const topSellingProducts = await OrderModel.aggregate(aggregationPipeline);

			return topSellingProducts;
		} catch (error) {
			console.error("Error fetching top-selling products:", error);
			throw new Error("Internal server error");
		}
	}
}

export default new ChartsService();
