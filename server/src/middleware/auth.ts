import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserModel from "../models/user.model";
import {
	AuthRequestEntity,
	DecodedTokenEntity,
	UserEntity,
	UserPropType,
} from "../types/user";

dotenv.config();

export const auth = async (
	req: AuthRequestEntity,
	res: Response,
	next: NextFunction
) => {
	try {
		const token = req.header("Authorization")?.replace("Bearer ", "");

		// console.log(`[Middleware > auth > token]`, token);

		const decoded = jwt.verify(
			token as string,
			<string>process.env.JWT_TOKEN_SECRET
		) as DecodedTokenEntity;

		const user = await UserModel.findOne({
			_id: decoded._id as string,
			"tokens.token": token,
		});

		// console.log(`[Middleware > auth > user]`, user);

		if (!user) {
			throw new Error();
		}

		// console.log(`[Middleware > auth > user]`, user);

		req.token = token;
		req.user = user;
		next();
	} catch (error) {
		res.status(401).send({
			success: false,
			message: `Authentication error`,
		});
	}
};
