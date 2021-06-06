"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_controller_1 = __importDefault(require("../controller/users.controller"));
var router = express_1.Router();
router.get("/", users_controller_1.default.getAllUsers);
router.post("/", users_controller_1.default.createUser);
exports.default = router;
