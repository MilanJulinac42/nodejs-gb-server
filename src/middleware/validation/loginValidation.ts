import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const loginUserValidation = (req: Request, res: Response, next: NextFunction) => {
	const schema = Joi.object({
		email: Joi.string().email().required().messages({
			"string.email": "Invalid email",
			"any.required": "Email is required"
		}),
		password: Joi.string().required().messages({
			"any.required": "Password is required"
		})
	});

	const { error } = schema.validate(req.body);
	if (error) {
		const errorMessage = error.details[0].message;
		return res.status(400).json({ error: errorMessage });
	}

	next();
};
