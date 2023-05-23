import { Request, Response } from "express";
import OrderService from "../services/order.service";
import { IOrder, IOrderModel, OrderStatus } from "../models/Order.model";

// CREATE a order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, firstName, lastName, baskets, totalPrice, orderStatus, street, city, zipCode } = req.body;

		const savedOrder = await OrderService.createOrder({
			email,
			firstName,
			lastName,
			baskets,
			totalPrice,
			orderStatus,
			street,
			city,
			zipCode
		});

		res.status(201).json({ message: "Order created", order: savedOrder });
	} catch (error) {
		res.status(500).json({ message: "Error creating order", error });
	}
};
// READ all orders
export const getOrders = async (req: Request, res: Response): Promise<void> => {
	try {
		const orders = await OrderService.getOrders();

		res.status(200).json({ orders });
	} catch (error) {
		res.status(500).json({ message: "Error retrieving orders", error });
	}
};

// READ a single order
export const getOrder = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;

		const order = await OrderService.getOrder(id);

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

		const updatedOrder: IOrderModel | null = await OrderService.changeOrderStatus(id, status);

		if (updatedOrder) {
			res.status(200).json({ message: "Order status changed succesfully", order: updatedOrder });
		} else {
			res.status(404).json({ message: "Order not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error changing order status", error });
	}
};

// UPDATE a order by ID
export const updateOrderById = async (req: Request, res: Response): Promise<void> => {
	try {
		const { id } = req.params;
		const { email, firstName, lastName, baskets, totalPrice, orderStatus, street, city, zipCode } = req.body;

		const updatedFields: Partial<IOrder> = {
			...(email && { email }),
			...(firstName && { firstName }),
			...(lastName && { lastName }),
			...(baskets && { baskets }),
			...(totalPrice && { totalPrice }),
			...(orderStatus && { orderStatus }),
			...(street && { street }),
			...(city && { city }),
			...(zipCode && { zipCode })
		};

		const updatedOrder: IOrderModel | null = await OrderService.updateOrderById(id, updatedFields);

		if (updatedOrder) {
			res.status(200).json({ message: "Order updated successfully", order: updatedOrder });
		} else {
			res.status(404).json({ message: "Order not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Error updating order", error });
	}
};
// DELETE a order by ID
// SOFT DELETE a order by ID
