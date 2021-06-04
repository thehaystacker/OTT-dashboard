"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var user_model_1 = __importDefault(require("../../models/user.model"));
router.get("/", function (req, res) {
    res.status(200).send({ data: [] });
});
router.post("/", function (req, res) {
    console.log("[req]", req.body);
    var newUser = new user_model_1.default(req.body);
    newUser
        .save()
        .then(function () {
        console.log("[POST User] New user created : " + newUser);
        res.status(201).send({ message: "New user created" });
    })
        .catch(function (error) {
        console.log("[Error POST User] : " + error);
        res.status(400).send({ message: "Error creating user : " + error });
    });
});
exports.default = router;
