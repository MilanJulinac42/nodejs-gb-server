import OrderModel, { OrderStatus } from "../models/Order.model";

class ChartsService {
	public async getSalesStatistics(startDate: string, endDate: string) {
		try {
			const salesStatistics = await OrderModel.aggregate([
				{
					$match: {
						orderStatus: OrderStatus.DELIVERED,
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

	public async getTopSellingProducts(
		sortBy: "quantity" | "revenue",
		limit: number = 5,
		startDate: string,
		endDate: string
	) {
		try {
			const aggregationPipeline: any[] = [
				{
					$match: {
						orderStatus: OrderStatus.DELIVERED,
						createdAt: {
							$gte: new Date(new Date(startDate).setHours(0, 0, 0)),
							$lt: new Date(new Date(endDate).setHours(23, 59, 59))
						}
					}
				},
				{
					$unwind: "$baskets"
				},
				{
					$group: {
						_id: "$baskets._id",
						basketName: { $first: "$baskets.name" },
						totalQuantity: { $sum: "$baskets.quantity" },
						totalRevenue: { $sum: { $multiply: ["$baskets.quantity", "$baskets.price"] } }
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

	public async getRevenueByCategory(startDate: string, endDate: string) {
		try {
			const aggregationPipeline: any[] = [
				{
					$match: {
						orderStatus: OrderStatus.DELIVERED,
						createdAt: {
							$gte: new Date(new Date(startDate).setHours(0, 0, 0)),
							$lt: new Date(new Date(endDate).setHours(23, 59, 59))
						}
					}
				},
				{
					$unwind: "$baskets"
				},
				{
					$group: {
						_id: "$baskets.type",
						totalRevenue: { $sum: { $multiply: ["$baskets.quantity", "$baskets.price"] } }
					}
				},
				{
					$sort: {
						totalRevenue: -1
					}
				}
			];

			const revenueByCategory = await OrderModel.aggregate(aggregationPipeline);

			return revenueByCategory;
		} catch (error) {
			console.error("Error fetching revenue by category:", error);
			throw new Error("Internal server error");
		}
	}
}

export default new ChartsService();
