import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const createBasketItemValidation = (req: Request, res: Response, next: NextFunction) => {
	const basketItemSchema = Joi.object({
		name: Joi.string().required(),
		description: Joi.string().required(),
		price: Joi.number().required(),
		weight: Joi.number(),
		giftBasket: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
		isSerbian: Joi.boolean().required().default(false),
		deleted: Joi.boolean().default(false)
	});

	const { error } = basketItemSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};

export default createBasketItemValidation;
