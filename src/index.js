"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const mongoose_1 = require("./db/mongoose");
const createUserHandler_1 = require("./eventHandlers/createUserHandler");
const userLogin_1 = require("./eventHandlers/userLogin");
const user_in_lobby_1 = require("./eventHandlers/user_in_lobby");
const authUser_1 = require("./middleware/authUser");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: "*", }
});
try {
    (0, mongoose_1.connect_to_db)();
}
catch (err) {
    io.emit("db_error");
}
const port = process.env.PORT;
// const publicDir = path.join(__dirname, '../../public');
const clientDir = path_1.default.join(__dirname, "../../dist/public");
let user;
// Middleware
io.use(async (socket, next) => {
    try {
        user = await (0, authUser_1.authUser)(socket, user);
        next();
    }
    catch (err) {
        next(err);
    }
});
// app.use(express.static(publicDir));
app.use(express_1.default.static(clientDir));
io.on("connection", (socket) => {
    (0, userLogin_1.userLoginHandler)(io, socket);
    (0, createUserHandler_1.createUserHandler)(io, socket);
    (0, user_in_lobby_1.userInLobbyHandler)(io, socket, user);
    socket.on("close", () => console.log("closed"));
});
server.listen(port, () => console.log(`Server up on port ${port}`));
// async function test() {
//     const name = "bedroom";
//     const msg1: Message = {
//         author: "Me",
//         text: "text1",
//         createdAt: "date1",
//     }
//     const msg2: Message = {
//         author: "Me",
//         text: "text2",
//         createdAt: "date2",
//     }
//     const msg3: Message = {
//         author: "Me",
//         text: "text3",
//         createdAt: "date3",
//     }
//     const messages = [msg1, msg2, msg3]
//     const room = new Room({ name, messages });
//     await room.save();
//     const user = await User.findOne({ username: "marwano" });
//     if (user) {
//         user.currentRoom = room._id;
//         await user.save();
//     }
//     await room.populate("users");
//     const roomObj = room.toObject();
//     console.log(roomObj);
//     console.log(user?._id);
// }
// test()
