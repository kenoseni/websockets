const express = require("express");

const app = express();
const socketio = require("socket.io");

app.use(express.static(`${__dirname}/public`));

const server = app.listen(4159);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log(socket.id, "has connected");

  socket.emit("welcome", { data: "Welcome to the socketio server!!!" });

  socket.on("message to server", (msg) => {
    // here, msg is a buffer
    console.log("#########################", msg);
  });
});
