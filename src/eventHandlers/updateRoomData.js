"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRoomData = void 0;
async function updateRoomData(io, socket, room) {
    await room.populate("users");
    io.to(room.name).emit("showRoomers", room.toObject().users);
}
exports.updateRoomData = updateRoomData;
