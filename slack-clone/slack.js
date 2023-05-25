const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");

const app = express();

app.use(cors());

app.use(express.static(__dirname + "/public"));

const server = app.listen(1759);

const io = socketio(server);

io.on("connection", (socket) => {
  // socket here means the client connection
  socket.emit("welcome", "Welcome to the socketio server!!!");
  socket.on("message to server", (msg) => {
    // here, msg is a buffer
    console.log("#########################", msg.toString());
  });

  socket.on("new-message-to-server", (msg) => {
    // send to all connected sockets
    io.emit("message-to-client", { text: msg.text });
  });

  socket.join("level1", () => {});

  socket
    .to("level1")
    .emit("joined", `${socket.id} says I have joined the level1 room`);

  // The server can still communicate across namespaces
  // but on the client, the socket needs to be in that namespaces
  // in order to get the event
});

io.of("/admin").on("connection", (socket) => {
  console.log("$$$$$$ Someone connected to the admin namespace");

  io.of("/admin").emit("Welcome", "Welcome to the admin namespace");
});
