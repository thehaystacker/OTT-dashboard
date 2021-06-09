import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import config from "../config/common";
import UserModel from "../models/user.model";
import {
	AuthRequestEntity,
	TokenEntity,
	UserEntity,
	UserPropType,
} from "../types/user";

dotenv.config();

export const register = async (req: Request, res: Response) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		let response = {
			success: false,
			message: `Invalid or missing parameters`,
			errors: errors.array(),
		};

		console.log(`[Error user/register]`, response);

		return res.status(402).send(response);
	}

	try {
		const user = new UserModel(req.body);
		await user.save();

		const payload = {
			user: {
				_id: user._id,
			},
		};

		jwt.sign(
			payload,
			<string>process.env.JWT_TOKEN_SECRET,
			config.jwtOptions,
			(err, token) => {
				if (err) {
					throw err;
				}

				let response = { success: true, token };

				console.log(`[Success user/register]`, response);

				res.status(200).send(response);
			}
		);
	} catch (error) {
		let response = { success: false, message: error.message };

		console.log(`[Error user/register]`, response);

		res.status(500).send(response);
	}
};

export const login = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		let response = {
			success: false,
			message: `Invalid or missing parameters`,
			errors: errors.array(),
		};

		console.log(`[Error user/login]`, response);

		return res.status(402).send(response);
	}

	let { email, password } = req.body;

	try {
		let user = await UserModel.findByCredentials(email, password);
		let token = await user.generateAuthToken();

		console.log(`[user user/login]`, user);

		let response = {
			success: true,
			message: `User login successful`,
			data: { user, token },
		};

		res.status(200).send(response);
	} catch (error) {
		let response = {
			success: false,
			message: error.message,
		};

		res.status(500).send(response);
	}
};

export const getAllUsers = async (req: Request, res: Response) => {
	// console.log(`[controller > getAllUsers > req]`, req);

	try {
		const users = await UserModel.find({});
		res.status(200).send({ success: true, data: users });
	} catch (error) {
		res.status(400).send({ success: false, message: `No data found` });
	}
};

export const getUserProfile = async (req: AuthRequestEntity, res: Response) => {
	res.status(200).send({ success: true, data: req.user });
};

export const updateUser = async (req: Request, res: Response) => {
	const { body, params } = req;

	const propsToUpdate = Object.keys(body);
	const allowedProps = ["firstName", "lastName", "password"];

	const isUpdateValid = propsToUpdate.every((prop) =>
		allowedProps.includes(prop)
	);

	if (!isUpdateValid) {
		return res
			.status(405)
			.send({ success: false, message: `Method not allowed` });
	}

	try {
		const user = await UserModel.findById(params.id);
		if (!user) {
			return res.send({ success: false, message: `User not found` });
		}

		propsToUpdate.forEach((prop) => (user[prop as UserPropType] = body[prop]));
		await user.save();

		console.log(`[Controller > updateUser > user]`, user);

		res.send({ success: true, data: user });
	} catch (error) {
		res.status(500).send({ success: false, message: `Error updating record` });
	}
};

export const getSingleUserProfile = async (req: Request, res: Response) => {
	const { params } = req;

	try {
		let user = await UserModel.findById(params.id);

		// console.log(`[Controller > getSingleUserProfile > user]`, user);

		if (!user) {
			return res
				.status(404)
				.send({ success: false, message: `Record unavailable` });
		}
		res.status(200).send({ success: true, data: user });
	} catch (error) {
		res.status(500).send({
			success: false,
			message: `Error fetching record`,
		});
	}
};

export const logout = async (req: AuthRequestEntity, res: Response) => {
	try {
		let user = <UserEntity>req.user;
		const { body } = req;

		console.log(`[Controller > logout > body.all]`, body.all);
		console.log(`[Controller > logout > typeof body.all]`, typeof body.all);

		if (body.all === true) {
			user.tokens = [];
		} else {
			user.tokens = user.tokens.filter(
				(tokenObj) => tokenObj.token !== req.token
			);
		}

		await user.save();
		res.status(200).send({ success: true, message: `Logout successful` });
	} catch (error) {
		res.status(500).send({ success: false, message: `Error logging out user` });
	}
};
