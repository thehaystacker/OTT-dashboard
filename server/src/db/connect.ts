import mongoose from "mongoose";

export default (db: string) => {
	mongoose.connect(
		db,
		{ useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
		(error) => {
			if (error) {
				return console.log(
					`[MonboDB] Error connecting to database : ${error.message}`
				);
			}
			console.log(`[MongoDB] Connected to database`);
		}
	);
};
