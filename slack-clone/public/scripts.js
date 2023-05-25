const socket = io("http://localhost:5912"); // this namespace is called /
const socket2 = io("http://localhost:5912/admin"); // this namespace is called /admin
// const socket3 = io("http://localhost:5912/marketing"); // this namespace is called /marketing

socket.on("connect", (data) => {
  socket.on("welcome", (msg) => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!", msg);
  });
  socket.emit("message to server", "Client just emitted a message");
});

socket.on("joined", (msg) => {
  console.log("@@@@@@@@@@@@@@@@@", msg);
});

socket2.on("connect", (data) => {
  console.log(socket2.id);
});

document.querySelector("#message-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const text = document.querySelector("#user-message").value;

  socket.emit("new-message-to-server", { text });
});

socket.on("message-to-client", (msg) => {
  document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
});
