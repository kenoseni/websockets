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
let roomList = document.querySelector(".room-list");

// listen for the nsList event from the server which gives us the namespaces
socket.on("nsList", (nsData) => {
  console.log(nsData);

  // clear the room list content
  namespacesDiv.innerHTML = "";
  nsData.forEach((ns) => {
    // Update html with each ns
    namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}>
    <img
      src=${ns.image}
    />
  </div>`;
  });

  Array.from(document.getElementsByClassName("namespace")).forEach(
    (element) => {
      element.addEventListener("click", (e) => {
        joinNS(element, nsData, roomList);
      });
    }
  );

  joinNS(document.getElementsByClassName("namespace")[0], nsData, roomList);
});
