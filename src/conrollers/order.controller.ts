import { Request, Response } from "express";
import orderService from "../services/order.service";
import { IOrderModel, OrderStatus } from "../models/Order.model";

// CREATE a order
// READ all orders
export const getOrders = async (req: Request, res: Response): Promise<void> => {
	try {
		const orders = await orderService.getOrders();

		res.status(200).json({ orders });
	} catch (error) {
		res.status(500).json({ message: "Error retrieving orders", error });
	}
};

// READ a single order
export const getOrder = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const order = await orderService.getOrder(id);

		if (order) {
			res.status(200).json({ order });
		} else {
			res.status(404).json({ message: "Order not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error retrieving order information", error });
	}
};

// UPDATE a order status by ID
export const changeOrderStatus = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const status: OrderStatus = req.body;

		const updatedOrder: IOrderModel | null = await orderService.changeOrderStatus(id, status);

		if (updatedOrder) {
			res.status(200).json({ message: "Order status changed succesfully", order: updatedOrder });
		} else {
			res.status(404).json({ message: "Order not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error changing order status", error });
	}
};

// DELETE a order by ID
// SOFT DELETE a order by ID
