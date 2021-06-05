"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users_route_1 = __importDefault(require("./users.route"));
var router = express_1.Router();
router.use("/users", users_route_1.default);
exports.default = router;
