"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var connect_1 = __importDefault(require("./db/connect"));
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
var baseUrl = "/api/v1";
var port = process.env.PORT || 3001;
var db = "mongodb://localhost:27017/ott-dashboard";
connect_1.default(db);
app.use(express_1.default.static(path_1.default.resolve(__dirname, "../../client/build")));
app.use(baseUrl, routes_1.default);
app.get("*", function (req, res) {
    res.sendFile(path_1.default.resolve(__dirname, "../../client/build", "index.html"));
});
app.listen(port, function () {
    console.log("server is listening on " + port);
});
