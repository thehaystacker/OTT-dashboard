import { check } from "express-validator";
import userModel from "../models/user.model";

export const validateRegister = () => [
	check(`email`)
		.notEmpty()
		.withMessage(`Email is required`)
		.isEmail()
		.withMessage(`Invalid email`)
		.custom(async (email) => {
			const existingUser = await userModel.findOne({ email });
			if (existingUser) {
				throw new Error(`Email already in use`);
			}
		}),
	check(`password`)
		.notEmpty()
		.withMessage(`Password is required`)
		.isLength({ min: 5 })
		.withMessage(`Password should have minimun 5 characters`),
	check(`firstName`).notEmpty().withMessage(`First name is required`),
];

export const validateLogin = () => [
	check(`email`)
		.notEmpty()
		.withMessage(`Email is required`)
		.isEmail()
		.withMessage(`Invlid email`),
	check("password").notEmpty().withMessage(`Password is required`),
];
