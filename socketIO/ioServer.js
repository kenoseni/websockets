const http = require("http");
const socketio = require("socket.io");

const server = http.createServer((req, res) => {
  // Set CORS headers
  //   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5500");
  //   res.setHeader("Access-Control-Request-Method", "*");
  //   res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  //   res.setHeader("Access-Control-Allow-Headers", req.headers.origin);
  //   if (req.method === "OPTIONS") {
  //     res.writeHead(200);
  //     res.end("I am connected");
  //   }
  res.end("I am connected");
});

const io = socketio(server, {
  cors: {
    origin: ["http://localhost:5500"],
  },
});

io.on("connection", (socket) => {
  socket.emit("welcome", "Welcome to the socketio server!!!");
  socket.on("message from client", (msg) => {
    // here, msg is a buffer
    console.log("#########################", msg.toString());
  });
});

server.listen(5912);
