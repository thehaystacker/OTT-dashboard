import { Router, Request, Response } from "express";
const router = Router();
import UserModel from "../../models/user.model";

router.get(`/`, (req: Request, res: Response) => {
	res.status(200).send({ data: [] });
});

router.post(`/`, (req, res) => {
	console.log(`[req]`, req.body);

	const newUser = new UserModel(req.body);
	newUser
		.save()
		.then(() => {
			console.log(`[POST User] New user created : ${newUser}`);

			res.status(201).send({ message: `New user created` });
		})
		.catch((error) => {
			console.log(`[Error POST User] : ${error}`);

			res.status(400).send({ message: `Error creating user : ${error}` });
		});
});

export default router;
