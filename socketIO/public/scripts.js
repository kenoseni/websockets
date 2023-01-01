const socket = io("http://localhost:5912");

socket.on("connect", (data) => {
  socket.on("welcome", (msg) => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!", msg);
  });
  socket.emit("message to server", "Client just emitted a message");
});

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const text = document.querySelector("#user-message").value;

  socket.emit("new-message-to-server", { text });
});

socket.on("message-to-client", (msg) => {
  document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
});
