"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = require("mongoose");
const RoomSchema = new mongoose_1.Schema({
    name: {
        required: true,
        type: String
    },
    users: [{
            type: mongoose_1.Types.ObjectId
        }],
    messages: [{
            type: {
                text: String,
                createdAt: String
            }
        }]
});
const Room = (0, mongoose_1.model)("Room", RoomSchema);
exports.Room = Room;
