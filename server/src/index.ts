import express from "express";
import path from "path";

const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
	res.send({ message: "Hello" });
});

app.listen(port, () => {
	console.log(`server is listening on ${port}`);
});
