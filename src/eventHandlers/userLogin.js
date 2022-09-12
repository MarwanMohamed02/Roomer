"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginHandler = void 0;
const userModel_1 = require("../db/models/userModel");
function userLoginHandler(io, socket) {
    socket.on("login", async ({ username, password }) => {
        try {
            const { user, error } = await userModel_1.User.login(username, password);
            if (error) {
                return socket.emit("login_error", error.message);
            }
            else if (user?.token !== undefined) {
                return socket.emit("already_logged_in");
            }
            const token = await user?.genToken();
            socket.emit("found", { token, username, _id: user?._id.toString() });
        }
        catch (err) {
            socket.emit("db_error", err);
            console.log("Login err: \n" + err);
        }
    });
}
exports.userLoginHandler = userLoginHandler;
