const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");
const namespaces = require("./data/namespaces");

const app = express();
app.use(express.static(`${__dirname}/public`));

const server = app.listen(4161, () => {
  console.log("I have first connected to an http server");
});
const io = socketio(server);

// io == server in the docs

io.on("connection", (socket) => {
  socket.emit("welcome", "Welcome to the server");

  socket.on("clientConnect", (data) => {
    console.log(socket.id, "has connected via a websocket");
  });

  socket.emit("nsList", namespaces);
});
