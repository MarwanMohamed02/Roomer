"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect_to_db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const url = process.env.MONGODB_URL;
async function connect_to_db() {
    await mongoose_1.default.connect(url);
}
exports.connect_to_db = connect_to_db;
