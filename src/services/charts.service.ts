import OrderModel from "../models/Order.model";

class ChartsService {
	public async getSalesStatistics() {
		try {
			const salesStatistics = await OrderModel.aggregate([
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
}

export default new ChartsService();
