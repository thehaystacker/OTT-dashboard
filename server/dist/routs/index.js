"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get("/user", function (req, res) {
    res.send({ message: "From user" });
});
exports.default = router;
