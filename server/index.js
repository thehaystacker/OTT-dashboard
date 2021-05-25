var express = require("express");
var path = require("path");
var port = process.env.PORT || 3001;
var app = express();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve(__dirname, "../client/build")));
    app.get("*", function (req, res) {
        res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
    });
}
app.get("/api", function (req, res) {
    res.send({ message: "success" });
});
app.listen(port, function () {
    console.log("App is listening on port " + port);
});
