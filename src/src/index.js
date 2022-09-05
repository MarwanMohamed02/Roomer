"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const path_1 = __importDefault(require("path"));
const socket_io_1 = require("socket.io");
const bad_words_1 = __importDefault(require("bad-words"));
require("./db/mongoose");
const messages_1 = require("./utils/messages");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const port = process.env.PORT || 3000;
// const publicDir = path.join(__dirname, '../../public');
const clientDir = path_1.default.join(__dirname, "../../dist/public");
// app.use(express.static(publicDir));
app.use(express_1.default.static(clientDir));
io.on("connection", (socket) => {
    socket.on("login", async ({ username, room }) => {
        // const sameUsername = await User.findOne({ username });
        // if (!sameUsername) {
        //     socket.emit("notFound");
        // }
        // else
        //     socket.emit("found");
    });
    socket.on("joinData", async ({ username, room }) => {
        socket.join(room); // gives us access to send messsages to sepcific rooms  => .to(room)
        // Alerting other users that a new user has entered
        socket.broadcast.to(room).emit("message", (0, messages_1.genMessage)(`${username} has joined the room!`));
        // Greeting new user only
        socket.emit("message", (0, messages_1.genMessage)("Welcome User!"));
        // Alerting users that someone has left
        socket.on("disconnect", () => {
            io.to(room).emit("message", (0, messages_1.genMessage)(`${username} has left the room :(`));
        });
        // Sending a new message to everyone
        socket.on("sendMessage", (msg, ack) => {
            const filter = new bad_words_1.default();
            if (filter.isProfane(msg)) {
                return ack("Profanity is not allowed");
            }
            io.to(room).emit("message", (0, messages_1.genMessage)(msg));
            ack("Message sent!");
        });
        // Sending location to everyone
        socket.on("sendLocation", ({ latitude, longitude }, ack) => {
            io.to(room).emit("sendLocationMessage", (0, messages_1.genMessage)(`https://google.com/maps?q=${latitude},${longitude}`));
            ack("Location was shared successfully!");
        });
    });
});
server.listen(port, () => console.log(`Server up on port ${port}`));
// async function createUser() {
//     const user = new User({ username: "Marwano", room: "Bedroom" });
//     await user.save();
// }
// createUser();
