"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genMessage = void 0;
const moment_1 = __importDefault(require("moment"));
function genMessage(text) {
    return {
        text,
        createdAt: (0, moment_1.default)(new Date().getTime()).format("h:mm  a")
    };
}
exports.genMessage = genMessage;
