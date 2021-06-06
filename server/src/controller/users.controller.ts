import { Request, Response } from "express";
import UsersModel from "../models/users.model";
import { AllowedPropsEntity } from "../types/users";

const getAllUsers = async (req: Request, res: Response) => {
	try {
		const users = await UsersModel.find({});
		res.status(200).send({ success: true, data: users });
	} catch (error) {
		res.status(400).send({ success: false, message: `No data found` });
	}
};

const createUser = async (req: Request, res: Response) => {
	const newUser = new UsersModel(req.body);
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

const updateUser = async (req: Request, res: Response) => {
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
		const user = await UsersModel.findById(params.id);
		if (!user) {
			return res.send({ success: false, message: `User not found` });
		}

		res.send({ success: true, data: user });
	} catch (error) {}
};

export default {
	getAllUsers,
	createUser,
	updateUser,
};
