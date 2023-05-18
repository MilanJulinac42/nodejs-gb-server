import Order, { IOrder, IOrderModel, OrderStatus } from "../models/Order.model";

class OrderService {
	public async getOrders(): Promise<IOrderModel[]> {
		return Order.find();
	}

	public async getOrder(id: string): Promise<IOrderModel | null> {
		return Order.findById(id);
	}

	public async changeOrderStatus(id: string, status: OrderStatus): Promise<IOrderModel | null> {
		return Order.findByIdAndUpdate(id, { $set: { status } }, { new: true });
	}
}

export default new OrderService();
