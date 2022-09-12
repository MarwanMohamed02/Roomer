"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesHandler = void 0;
const roomModel_1 = require("../db/models/roomModel");
const messages_1 = require("../utils/messages");
const bad_words_1 = __importDefault(require("bad-words"));
async function messagesHandler(io, socket, room, user) {
    socket.emit("loadMessages", room.messages);
    socket.emit("showActiveRooms", await roomModel_1.Room.getActiveRooms());
    // Greeting new user only
    socket.emit("message", (0, messages_1.genMessage)("Welcome User!"));
    // Sending a new message to everyone
    socket.on("sendMessage", async (msg, ack) => {
        const filter = new bad_words_1.default();
        if (filter.isProfane(msg)) {
            return ack("Profanity is not allowed");
        }
        console.log(socket.rooms);
        console.log(`${room.name} sent a message`);
        const message = (0, messages_1.genMessage)(msg, user);
        room.addMessage(message);
        io.emit("showActiveRooms", await roomModel_1.Room.getActiveRooms());
        io.to(room.name).emit("message", message);
    });
    // Sending location to everyone
    socket.on("sendLocation", ({ latitude, longitude }, ack) => {
        const locationMessage = (0, messages_1.genMessage)(`https://google.com/maps?q=${latitude},${longitude}`, user);
        io.to(room.name).emit("sendLocationMessage", locationMessage);
        room.addMessage(locationMessage);
        ack("Location was shared successfully!");
    });
}
exports.messagesHandler = messagesHandler;
