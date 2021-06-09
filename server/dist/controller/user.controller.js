"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.getSingleUserProfile = exports.updateUser = exports.getUserProfile = exports.getAllUsers = exports.login = exports.register = void 0;
var express_validator_1 = require("express-validator");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var common_1 = __importDefault(require("../config/common"));
var user_model_1 = __importDefault(require("../models/user.model"));
dotenv_1.default.config();
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, response, user, payload, error_1, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    response = {
                        success: false,
                        message: "Invalid or missing parameters",
                        errors: errors.array(),
                    };
                    console.log("[Error user/register]", response);
                    return [2 /*return*/, res.status(402).send(response)];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                user = new user_model_1.default(req.body);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                payload = {
                    user: {
                        _id: user._id,
                    },
                };
                jsonwebtoken_1.default.sign(payload, process.env.JWT_TOKEN_SECRET, common_1.default.jwtOptions, function (err, token) {
                    if (err) {
                        throw err;
                    }
                    var response = { success: true, token: token };
                    console.log("[Success user/register]", response);
                    res.status(200).send(response);
                });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                response = { success: false, message: error_1.message };
                console.log("[Error user/register]", response);
                res.status(500).send(response);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, response, _a, email, password, user, token, response, error_2, response;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = express_validator_1.validationResult(req);
                if (!errors.isEmpty()) {
                    response = {
                        success: false,
                        message: "Invalid or missing parameters",
                        errors: errors.array(),
                    };
                    console.log("[Error user/login]", response);
                    return [2 /*return*/, res.status(402).send(response)];
                }
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1.default.findByCredentials(email, password)];
            case 2:
                user = _b.sent();
                return [4 /*yield*/, user.generateAuthToken()];
            case 3:
                token = _b.sent();
                console.log("[user user/login]", user);
                response = {
                    success: true,
                    message: "User login successful",
                    data: { user: user, token: token },
                };
                res.status(200).send(response);
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                response = {
                    success: false,
                    message: error_2.message,
                };
                res.status(500).send(response);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
var getAllUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.default.find({})];
            case 1:
                users = _a.sent();
                res.status(200).send({ success: true, data: users });
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(400).send({ success: false, message: "No data found" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getUserProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.status(200).send({ success: true, data: req.user });
        return [2 /*return*/];
    });
}); };
exports.getUserProfile = getUserProfile;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, params, propsToUpdate, allowedProps, isUpdateValid, user_1, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body, params = req.params;
                propsToUpdate = Object.keys(body);
                allowedProps = ["firstName", "lastName", "password"];
                isUpdateValid = propsToUpdate.every(function (prop) {
                    return allowedProps.includes(prop);
                });
                if (!isUpdateValid) {
                    return [2 /*return*/, res
                            .status(405)
                            .send({ success: false, message: "Method not allowed" })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1.default.findById(params.id)];
            case 2:
                user_1 = _a.sent();
                if (!user_1) {
                    return [2 /*return*/, res.send({ success: false, message: "User not found" })];
                }
                propsToUpdate.forEach(function (prop) { return (user_1[prop] = body[prop]); });
                return [4 /*yield*/, user_1.save()];
            case 3:
                _a.sent();
                console.log("[Controller > updateUser > user]", user_1);
                res.send({ success: true, data: user_1 });
                return [3 /*break*/, 5];
            case 4:
                error_4 = _a.sent();
                res.status(500).send({ success: false, message: "Error updating record" });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateUser = updateUser;
var getSingleUserProfile = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, user, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                params = req.params;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_model_1.default.findById(params.id)];
            case 2:
                user = _a.sent();
                // console.log(`[Controller > getSingleUserProfile > user]`, user);
                if (!user) {
                    return [2 /*return*/, res
                            .status(404)
                            .send({ success: false, message: "Record unavailable" })];
                }
                res.status(200).send({ success: true, data: user });
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(500).send({
                    success: false,
                    message: "Error fetching record",
                });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getSingleUserProfile = getSingleUserProfile;
var logout = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, body, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                user = req.user;
                body = req.body;
                console.log("[Controller > logout > body.all]", body.all);
                console.log("[Controller > logout > typeof body.all]", typeof body.all);
                if (body.all === true) {
                    user.tokens = [];
                }
                else {
                    user.tokens = user.tokens.filter(function (tokenObj) { return tokenObj.token !== req.token; });
                }
                return [4 /*yield*/, user.save()];
            case 1:
                _a.sent();
                res.status(200).send({ success: true, message: "Logout successful" });
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                res.status(500).send({ success: false, message: "Error logging out user" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.logout = logout;
