const socket = io("http://localhost:4159");

socket.on("connect", (data) => {
  console.log(">>>>>>>>>>>>>>", socket.id);
});

socket.on("welcome", (msg) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!", msg);
});

socket.emit("message to server", { data: "Client just emitted a message" });
