const socket = io("http://localhost:4160");

socket.on("connect", (data) => {
  console.log(">>>>>>>>>>>>>>", socket.id);
});

// socket.on("messageFromServer", (dataFromServer) => {
//   console.log("??????", dataFromServer);
// });

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const text = document.querySelector("#user-message").value;

  socket.emit("newMessageToServer", { text });
});
socket.on("newMessageToClient", (msg) => {
  document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
});
