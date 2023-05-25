import mongoose from "mongoose";
import Order, { IOrder, IOrderModel, OrderStatus } from "../models/Order.model";

interface CreateBasketInput {
	email: string;
	firstName: string;
	lastName: string;
	baskets: { basketId: string; quantity: number }[];
	totalPrice: number;
	orderStatus: string;
	street: string;
	city: string;
	zipCode: string;
}

class OrderService {
	public async createOrder(order: CreateBasketInput): Promise<IOrderModel> {
		const baskets = order.baskets.map((basket) => ({
			basketId: basket.basketId,
			quantity: basket.quantity
		}));

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
