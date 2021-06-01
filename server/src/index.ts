import express from "express";
import path from "path";

const app = express();
const port = 3001;

app.use(express.static(path.resolve(__dirname, "../../client/build")));

app.get("/", (req, res) => {
	res.send("The sedulous hyena ate");
});

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
});

app.listen(port, () => {
	console.log(`server is listening on ${port}`);
});
