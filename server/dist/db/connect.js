"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
exports.default = (function (db) {
    mongoose_1.default.connect(db, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, function (error) {
        if (error) {
            return console.log("[MonboDB] Error connecting to database : " + error.message);
        }
        console.log("[MongoDB] Connected to database");
    });
});
