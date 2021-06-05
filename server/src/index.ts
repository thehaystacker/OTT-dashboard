import express, { Application, Request, Response } from "express";
import path from "path";
import connect from "./db/connect";
import routes from "./routes";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const baseUrl = `/api/v1`;
const port = process.env.PORT || 3001;
const db = `mongodb://localhost:27017/ott-dashboard`;

connect(db);

app.use(express.static(path.resolve(__dirname, "../../client/build")));

app.use(baseUrl, routes);

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
});

app.listen(port as number, (): void => {
	console.log(`server is listening on ${port}`);
});
