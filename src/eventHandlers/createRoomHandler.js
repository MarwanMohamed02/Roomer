"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoomHandler = void 0;
const roomModel_1 = require("../db/models/roomModel");
function createRoomHandler(io, socket, user) {
    socket.on("createNewRoom", async (newRoomName) => {
        try {
            const newRoom = new roomModel_1.Room({ name: newRoomName });
            await newRoom.save();
            console.log(`created ${newRoom.name}`);
            socket.emit("user_created_room", newRoom.name);
        }
        catch (err) {
            if (err.code === 11000)
                socket.emit("duplicate_room_error");
            else
                socket.emit("db_error");
        }
    });
}
exports.createRoomHandler = createRoomHandler;
