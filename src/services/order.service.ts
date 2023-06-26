import Order, { IOrder, IOrderModel, OrderStatus } from "../models/Order.model";
import Basket from "../models/Basket.model";

interface CreateBasketInput {
	email: string;
	firstName: string;
	lastName: string;
	baskets: { basketId: string; name: string; quantity: number }[];
	totalPrice: number;
	orderStatus: string;
	street: string;
	city: string;
	zipCode: string;
}

class OrderService {
	public async createOrder(order: CreateBasketInput): Promise<IOrderModel> {
		const baskets = await Promise.all(
			order.baskets.map(async (basket) => {
				const basketData = await Basket.findById(basket.basketId);
				return {
					basketId: basket.basketId,
					name: basketData?.name || "",
					quantity: basket.quantity
				};
			})
		);

		const newOrder: IOrderModel = new Order({ ...order, baskets });
		const savedOrder = await newOrder.save();

		return savedOrder;
	}

	public async getOrders(): Promise<IOrderModel[]> {
		return Order.find();
	}

	public async getOrder(id: string): Promise<IOrderModel | null> {
		return Order.findById(id);
	}

	public async changeOrderStatus(id: string, orderStatus: OrderStatus): Promise<IOrderModel | null> {
		return Order.findByIdAndUpdate(id, { $set: { orderStatus } }, { new: true });
	}

	public async updateOrderById(id: string, updatedFields: Partial<IOrder>): Promise<IOrderModel | null> {
		const updatedOrder: IOrderModel | null = await Order.findByIdAndUpdate(
			id,
			{ $set: updatedFields },
			{ new: true }
		);

		return updatedOrder;
	}
}

export default new OrderService();
