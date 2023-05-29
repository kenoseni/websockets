const express = require("express");
const cors = require("cors");
const socketio = require("socket.io");

const app = express();
app.use(express.static(`${__dirname}/public`));

const server = app.listen(4160, () => {
  console.log("I have first connected to an http server");
});
const io = socketio(server);

// io == server in the docs

io.on("connection", (socket) => {
  console.log(socket.id, "has connected via a websocket");

  //   socket.emit("messageFromServer", { data: "Welcome to the socket server" });

  //   socket.on("messageFromClient", (dataFromClient) => {
  //     console.log("Data:", dataFromClient);
  //   });

  socket.on("newMessageToServer", (dataFromClient) => {
    // send to all connected sockets
    io.emit("newMessageToClient", { text: dataFromClient.text });
  });
});
