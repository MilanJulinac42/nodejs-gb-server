import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { GiftBasketType } from "../../models/Basket.model";

const createBasketValidation = (req: Request, res: Response, next: NextFunction) => {
	const basketSchema = Joi.object({
		name: Joi.string().required(),
		description: Joi.string().required(),
		price: Joi.number().required(),
		profit: Joi.number().required(),
		inStock: Joi.number().optional().default(0),
		sold: Joi.number().optional().default(0),
		totalProfit: Joi.number().optional().default(0),
		liked: Joi.number().optional().default(0),
		type: Joi.string()
			.valid(...Object.values(GiftBasketType))
			.default(GiftBasketType.OTHER)
			.required(),
		giftBasketItems: Joi.array().items(
			Joi.object({
				item: Joi.string()
					.regex(/^[0-9a-fA-F]{24}$/)
					.required(),
				quantity: Joi.number().integer().min(1).required()
			})
		),
		basketType: Joi.string()
			.regex(/^[0-9a-fA-F]{24}$/)
			.required(),
		isSerbian: Joi.boolean().required().default(false),
		imageUrl: Joi.string().optional(),
		deleted: Joi.boolean().required().default(false)
	});

	const { error } = basketSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};

export default createBasketValidation;
