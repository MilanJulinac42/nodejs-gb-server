import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { GiftBasketType } from "../../models/Basket.model";
import multer from "multer";

const createBasketValidationSchema = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
	price: Joi.number().required(),
	profit: Joi.number().required(),
	type: Joi.string()
		.valid(...Object.values(GiftBasketType))
		.default(GiftBasketType.OTHER)
		.required(),
	isSerbian: Joi.boolean().required().default(false),
	imageUpload: Joi.any().optional(),
	basketType: Joi.string()
		.regex(/^[0-9a-fA-F]{24}$/)
		.required()
});

const upload = multer();

const createBasketValidation = (req: Request, res: Response, next: NextFunction) => {
	console.log(req.body);
	upload.any()(req, res, (err) => {
		if (err) {
			return res.status(400).json({ error: "Error processing form-data" });
		}

		const { error } = createBasketValidationSchema.validate(req.body, {
			allowUnknown: true,
			abortEarly: false,
			stripUnknown: true
		});

		if (error) {
			return res.status(400).json({ error: error.details.map((detail) => detail.message) });
		}

		next();
	});
};

export default createBasketValidation;
