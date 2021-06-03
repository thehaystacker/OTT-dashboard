import { model, Schema, Document } from "mongoose";

export interface UserEntity extends Document {
	firstName: string;
	lastName: string;
	email: string;
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
});

export default model<UserEntity>("User", UserSchema);
