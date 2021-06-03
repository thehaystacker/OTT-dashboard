import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";

const app: Application = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "../../client/build")));

app.get("/api", (req: Request, res: Response) => {
	res.send({ message: "Hello" });
});

app.get("*", (req: Request, res: Response) => {
	res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
});

app.listen(port as number, (): void => {
	console.log(`server is listening on ${port}`);
});
