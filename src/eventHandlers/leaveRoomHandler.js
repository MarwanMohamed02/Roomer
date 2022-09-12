"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveRoomHandler = void 0;
const messages_1 = require("../utils/messages");
const updateRoomData_1 = require("./updateRoomData");
function leaveRoomHandler(io, socket, user, room) {
    socket.on("leaveRoom", async () => {
        try {
            if (user) {
                user.currentRoom = undefined;
                await user.save();
            }
            console.log(`${user.username} left ${room.name}`);
            socket.leave(room.name);
            io.to(room.name).emit("message", (0, messages_1.genMessage)(`${user.username} has left the room :(`));
            socket.emit("user_left_room");
            (0, updateRoomData_1.updateRoomData)(io, socket, room);
        }
        catch (err) {
            socket.emit("db_error", err);
            console.log("Leave room err: \n" + err);
        }
    });
}
exports.leaveRoomHandler = leaveRoomHandler;
