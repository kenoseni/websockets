const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");

const app = express();

app.use(cors());

app.use(express.static(__dirname + "/public"));

const server = app.listen(5912);

const io = socketio(server);

io.on("connection", (socket) => {
  socket.emit("welcome", "Welcome to the socketio server!!!");
  socket.on("message to server", (msg) => {
    // here, msg is a buffer
    console.log("#########################", msg.toString());
  });

  socket.on("new-message-to-server", (msg) => {
    // send to all connected sockets
    io.emit("message-to-client", { text: msg.text });
  });
});
