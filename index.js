const express = require("express");
const path = require("path");

const port = process.env.PORT || 3001;

const app = express();
app.use(express.static(path.resolve(__dirname, "client/build")));

app.get("/api", (req, res) => {
	res.send({ message: "success" });
});

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});

app.listen(port, () => {
	console.log("App is listening on port " + port);
});
