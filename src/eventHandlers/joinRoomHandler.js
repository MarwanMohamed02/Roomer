"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinRoomHandler = void 0;
const roomModel_1 = require("../db/models/roomModel");
const messages_1 = require("../utils/messages");
const leaveRoomHandler_1 = require("./leaveRoomHandler");
const messagesHandler_1 = require("./messagesHandler");
const updateRoomData_1 = require("./updateRoomData");
function joinRoomHandler(io, socket, user) {
    socket.on("joinRoom", async ({ roomName }) => {
        try {
            let room = await roomModel_1.Room.findOne({ name: roomName });
            if (!room) {
                return socket.emit("room_not_found", roomName);
            }
            if (!user.currentRoom || !(user.currentRoom?.toString() === room._id.toString())) {
                socket.broadcast.to(room.name).emit("message", (0, messages_1.genMessage)(`${user.username} has joined the room!`));
            }
            user.currentRoom = room._id;
            await user.save();
            socket.join(room.name);
            socket.emit("user_joined_room", room.name, user.username);
            (0, messagesHandler_1.messagesHandler)(io, socket, room, user);
            (0, updateRoomData_1.updateRoomData)(io, socket, room);
            (0, leaveRoomHandler_1.leaveRoomHandler)(io, socket, user, room);
        }
        catch (err) {
            socket.emit("db_error", err);
            console.log("Join room err: \n" + err);
        }
    });
}
exports.joinRoomHandler = joinRoomHandler;
