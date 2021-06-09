"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSafeUserData = void 0;
var getSafeUserData = function (data) {
    var user = Object.assign({}, data);
    var excludeKeys = ["tokens", "__v"];
    excludeKeys.forEach(function (key) {
        delete user[key];
    });
    console.log("[utils > getSafeUserData > user]", user);
    return user;
};
exports.getSafeUserData = getSafeUserData;
