import mongoose from "mongoose";

export default async (db: string) => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useUnifiedTopology: true,
		});

		console.log(`[MongoDB] Connected to database`);
	} catch (error) {
		console.log(`[MongoDB] Error connecting to database`, error);

		throw error;
	}
};
