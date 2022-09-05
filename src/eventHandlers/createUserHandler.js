"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = void 0;
const userModel_1 = require("../db/models/userModel");
function createUserHandler(io, socket) {
    socket.on("createNewUser", async ({ username, password }) => {
        try {
            if (await userModel_1.User.findOne({ username }))
                return socket.emit("duplicate_user_error");
            const user = new userModel_1.User({ username, password });
            await user.genToken();
            await user.save();
            socket.emit("user_created", user);
        }
        catch (err) {
            socket.emit("db_error");
        }
    });
}
exports.createUserHandler = createUserHandler;
