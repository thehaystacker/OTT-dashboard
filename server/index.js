const express = require("express");
const path = require("path");

const port = process.env.PORT || 3001;

const app = express();
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.resolve(__dirname, "../client/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
	});
}

app.get("/api", (req, res) => {
	res.send({ message: "success" });
});

app.listen(port, () => {
	console.log("App is listening on port " + port);
});
