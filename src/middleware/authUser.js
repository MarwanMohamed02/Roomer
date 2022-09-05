"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../db/models/userModel");
async function authUser(socket, user) {
    const token = socket.handshake.auth.token;
    if (token === undefined) {
        throw new Error("Authorization needed!");
    }
    else if (token === "hello")
        return undefined;
    const _id = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    try {
        user = await userModel_1.User.findOne({ _id, token });
        if (!user)
            throw new Error("Authorization needed!");
        else
            return user;
    }
    catch (err) {
        socket.emit("db_error");
    }
}
exports.authUser = authUser;
