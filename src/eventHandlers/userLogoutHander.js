"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLogoutHandler = void 0;
const userModel_1 = require("../db/models/userModel");
function userLogoutHandler(io, socket) {
    socket.on("logout", async (token) => {
        try {
            const user = await userModel_1.User.findOne({ token });
            if (user) {
                await user.logOut();
                socket.emit("loggedOut");
            }
        }
        catch (err) {
            socket.emit("db_error");
        }
    });
}
exports.userLogoutHandler = userLogoutHandler;
