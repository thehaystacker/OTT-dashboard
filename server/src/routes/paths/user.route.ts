import { Router, Request, Response } from "express";
import { Error } from "mongoose";
const router = Router();
import UserModel from "../../models/user.model";

interface ErrorEntity extends Error {
	driver: boolean;
	index: number;
	keyPattern: { [key: string]: any };
	keyValue: { [key: string]: any };
}

router.get(`/`, (req: Request, res: Response) => {
	res.status(200).send({ data: [] });
});

router.post(`/`, async (req, res) => {
	console.log(`[req]`, req.body);

	const newUser = new UserModel(req.body);
	newUser
		.save()
		.then(() => {
			res
				.status(201)
				.send({ success: true, message: `New user created`, data: newUser });
		})
		.catch((error: ErrorEntity) => {
			res.status(400).send({ success: false, error: error.message });
		});
});

export default router;
