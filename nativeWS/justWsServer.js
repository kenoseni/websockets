const http = require("http");
const { WebSocketServer } = require("ws");

const server = http.createServer((req, res) => {
  res.end("I am connected");
});

const wss = new WebSocketServer({
  server,
});

wss.on("headers", (headers, req) => {
  console.log("!!!!!!!!!!!!!!!!!", headers);
});

wss.on("connection", (websocket, req) => {
  websocket.send("Welcome to the websocket server!!!");
  websocket.on("message", (msg) => {
    // here, msg is a buffer
    console.log("#########################", msg.toString());
  });
});

server.listen(5912);
