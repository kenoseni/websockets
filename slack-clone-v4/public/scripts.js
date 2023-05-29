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
        const nsEndpoint = element.getAttribute("ns");

        const clickedNS = nsData.find((row) => row.endpoint === nsEndpoint);
        const rooms = clickedNS.rooms;

        // clear the room list content
        roomList.innerHTML = "";

        // loop through each room and add it to the dom
        rooms.forEach((room) => {
          roomList.innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`;
        });
      });
    }
  );
});
