"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userInLobbyHandler = void 0;
const roomModel_1 = require("../db/models/roomModel");
const createRoomHandler_1 = require("./createRoomHandler");
const joinRoomHandler_1 = require("./joinRoomHandler");
const userLogoutHander_1 = require("./userLogoutHander");
function userInLobbyHandler(io, socket, user) {
    socket.on("user_in_lobby", async () => {
        if (user.currentRoom) {
            try {
                const room = await roomModel_1.Room.findOne({ _id: user.currentRoom });
                socket.emit("user_returned", room);
            }
            catch (err) {
                socket.emit("db_error");
            }
        }
        let room;
        socket.on("findRoom", async (roomName) => {
            try {
                const room = await roomModel_1.Room.findOne({ name: roomName });
                if (!room) {
                    socket.emit("room_not_found", roomName);
                }
                else
                    socket.emit("room_found", room.name);
            }
            catch (err) {
                socket.emit("db_error", err.message);
                console.log("Find room err: \n" + err);
            }
        });
        (0, joinRoomHandler_1.joinRoomHandler)(io, socket, user);
        try {
            socket.emit("showActiveRooms", await roomModel_1.Room.getActiveRooms());
        }
        catch (err) {
            socket.emit("db_error", err);
            console.log("Show active rooms err: \n" + err);
        }
        (0, createRoomHandler_1.createRoomHandler)(io, socket, user);
        (0, userLogoutHander_1.userLogoutHandler)(io, socket);
    });
}
exports.userInLobbyHandler = userInLobbyHandler;
