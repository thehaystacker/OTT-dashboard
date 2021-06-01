"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 3001;
// app.use(express.static(path.resolve(__dirname, "../../client/build")));
app.get("/api", function (req, res) {
    res.send("The sedulous hyena ate");
});
// app.get("*", (req, res) => {
// 	res.sendFile(path.resolve(__dirname, "../../client/build", "index.html"));
// });
app.listen(port, function () {
    console.log("server is listening on " + port);
});
