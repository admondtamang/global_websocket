"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
// Route for emitting events
app.post("/api/emit", (req, res) => {
    const { key, payload } = req.body || {};
    if (!key || !payload) {
        return res.status(400).send("Missing key or payload");
    }
    io.emit(key, payload);
    res.status(200).send("Event emitted");
});
// Health check route
app.get("/api/healthcheck", (req, res) => {
    res.status(200).send("Server is running");
});
// Health check route
app.get("/", (req, res) => {
    res.status(200).send("Server is running");
});
// Socket.IO connection
io.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
//# sourceMappingURL=index.js.map