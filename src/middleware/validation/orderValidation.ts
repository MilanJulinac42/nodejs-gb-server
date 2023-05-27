import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { OrderPaymentType, OrderStatus } from "../../models/Order.model";

const createOrderValidation = (req: Request, res: Response, next: NextFunction) => {
	const orderSchema = Joi.object({
		user: Joi.string()
			.regex(/^[0-9a-fA-F]{24}$/)
			.optional(),
		email: Joi.string().required(),
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		baskets: Joi.array().items(
			Joi.object({
				basketId: Joi.string()
					.regex(/^[0-9a-fA-F]{24}$/)
					.required(),
				quantity: Joi.number().integer().min(1).required()
			})
		),
		totalPrice: Joi.number().required(),
		orderStatus: Joi.string()
			.valid(...Object.values(OrderStatus))
			.default(OrderStatus.CREATED)
			.required(),
		paymentType: Joi.string()
			.valid(...Object.values(OrderPaymentType))
			.default(OrderPaymentType.ON_DELIVERY)
			.required(),
		street: Joi.string().required(),
		city: Joi.string().required(),
		zipCode: Joi.string().required(),
		country: Joi.string().default("Serbia").required()
	});

	const { error } = orderSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};

export default createOrderValidation;
