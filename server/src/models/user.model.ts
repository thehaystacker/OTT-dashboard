import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import config from "../config/common";
import { UserEntity, UserModelEntity, UserPropType } from "../types/user";

dotenv.config();

const UserSchema: Schema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

UserSchema.statics.findByCredentials = async function (
	email: string,
	password: string
): Promise<UserEntity> {
	let user = await this.findOne({ email });
	if (!user) {
		throw new Error(`Invalid username or password`);
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error(`Incorrect password`);
	}

	return user;
};

UserSchema.methods.generateAuthToken = async function () {
	let user = <UserEntity>this;

	try {
		let token = await jwt.sign(
			{ _id: user._id },
			<string>process.env.JWT_TOKEN_SECRET,
			config.jwtOptions
		);

		user.tokens = [...user.tokens, { token }];
		await user.save();

		return token;
	} catch (error) {
		throw new Error(`Authentication error ${error.message}`);
	}
};

// UserSchema.methods.toJSON = function (user) {
// 	var obj = <UserEntity>user.toObject();
// 	const excludeKeys = ["tokens", "password", "__v"];
// 	excludeKeys.forEach((key) => {
// 		delete obj[<UserPropType>key];
// 	});
// 	return obj;
// };

UserSchema.pre<UserEntity>("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, config.pwdHashSalt);
	}
	next();
});

export default model<UserEntity, UserModelEntity>("User", UserSchema);
