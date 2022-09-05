"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomDataHandler = void 0;
async function roomDataHandler(io, socket, room) {
    await room.populate("users");
    io.to(room.name).emit("showRoomers", room.toObject().users);
}
exports.roomDataHandler = roomDataHandler;
