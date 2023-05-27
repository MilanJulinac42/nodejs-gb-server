import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { UserRole } from "../../models/User.model";

const createUserValidation = (req: Request, res: Response, next: NextFunction) => {
	const userSchema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required(),
		role: Joi.string()
			.valid(...Object.values(UserRole))
			.default(UserRole.CUSTOMER)
	});

	const { error } = userSchema.validate(req.body);
	if (error) {
		return res.status(400).json({ error: error.details[0].message });
	}

	next();
};

export default createUserValidation;
