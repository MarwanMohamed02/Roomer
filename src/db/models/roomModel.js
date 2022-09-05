"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = require("mongoose");
const RoomSchema = new mongoose_1.Schema({
    name: {
        required: true,
        type: String,
        unique: true
    },
    messages: [{
            type: {
                author: {
                    _id: {
                        type: String,
                    },
                    name: {
                        type: String,
                    }
                },
                text: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: String,
                    required: true,
                }
            }
        }]
}, {
    toJSON: { getters: true, virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
});
RoomSchema.virtual("users", {
    ref: "User",
    localField: "_id",
    foreignField: "currentRoom"
});
RoomSchema.methods.addMessage = async function (message) {
    this.messages?.push(message);
    await this.save();
};
RoomSchema.statics.getActiveRooms = async function () {
    const rooms = await Room.find({}).sort({ updatedAt: -1 }).limit(5);
    return rooms;
};
const Room = (0, mongoose_1.model)("Room", RoomSchema);
exports.Room = Room;
// const name = "bedroom";
// const user1 = new Types.ObjectId()
// const user2 = new Types.ObjectId()
// const users = [user1, user2];
// const msg1: Message = {
//     text: "text1",
//     createdAt: "date1",
// }
// const msg2: Message = {
//     text: "text2",
//     createdAt: "date2",
// }
// const msg3: Message = {
//     text: "text3",
//     createdAt: "date3",
// }
// const messages = [msg1, msg2, msg3];
// async function createRoom() {
//     const room = new Room({ name, users, messages });
//     await room.save();
// }
// createRoom()
