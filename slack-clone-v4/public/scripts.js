const username = prompt("What is your username");
const password = prompt("What is your password");

const socket = io("http://localhost:4161");

socket.on("connect", () => {
  console.log("Connected");
});

socket.emit("clientConnect");

socket.on("welcome", (data) => {
  console.log(data);
});

const namespacesDiv = document.querySelector(".namespaces");

// listen for the nsList event from the server which gives us the namespaces
socket.on("nsList", (nsData) => {
  console.log(nsData);

  nsData.forEach((ns) => {
    // Update html with each ns
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.name}>
    <img
      src=${ns.image}
    />
  </div>`;
  });
});
