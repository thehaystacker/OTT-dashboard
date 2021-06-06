import { Error } from "mongoose";

export interface MongooseErrorEntity extends Error {
	driver: boolean;
	index: number;
	keyPattern: { [key: string]: any };
	keyValue: { [key: string]: any };
}
