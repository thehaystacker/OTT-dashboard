import { Request, Response } from "express";
import UserModel from "../models/users.model";

const getAllUsers = async (req: Request, res: Response) => {
	res.status(200).send({ data: [] });
};

const createUser = async (req: Request, res: Response) => {
	const newUser = new UserModel(req.body);
	try {
		await newUser.save();
		res
			.status(201)
			.send({ success: true, message: `New user created`, data: newUser });
	} catch (error) {
		console.log(`[createUser > error message]`, error.message);

		res
			.status(400)
			.send({ success: false, error: error.message, code: error.code });
	}
};

export default {
	getAllUsers,
	createUser,
};
