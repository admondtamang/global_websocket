import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();

app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);

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
