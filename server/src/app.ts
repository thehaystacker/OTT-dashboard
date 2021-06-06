import express, { Application, Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import connect from "./db/connect";
import routes from "./routes";

dotenv.config();
const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const baseUrl = `/api/v1`;
const port = process.env.PORT || 80;
const db = `${process.env.MONGODB_URL}/${process.env.MONGODB_DBNAME}`;

connect(db);

app.use(express.static(path.resolve(__dirname, "../../client/build")));

app.use(baseUrl, routes);

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
});

app.listen(port as number, (): void => {
	console.log(`server is listening on ${port}`);
});
