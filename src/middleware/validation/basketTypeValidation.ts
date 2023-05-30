import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const createBasketTypeValidation = (req: Request, res: Response, next: NextFunction) => {
	const basketTypeSchema = Joi.object({
		name: Joi.string().required(),
		description: Joi.string().required(),
		price: Joi.number().required(),
		color: Joi.string().required(),
		giftBasket: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
		isSerbian: Joi.boolean().required().default(false),
		deleted: Joi.boolean().default(false)
	});

	const { error } = basketTypeSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};

export default createBasketTypeValidation;
