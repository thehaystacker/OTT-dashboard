import { model, Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";
import config from "../config/common";

export interface UserEntity extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

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
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

UserSchema.pre<UserEntity>("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, config.pwdHashSalt);
	}
	next();
});

export default model<UserEntity>("User", UserSchema);
