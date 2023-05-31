const joinNS = (element, nsData, roomList) => {
  const nsEndpoint = element.getAttribute("ns");

  const clickedNS = nsData.find((row) => row.endpoint === nsEndpoint);
  const rooms = clickedNS.rooms;

  // clear the room list content
  roomList.innerHTML = "";

  // loop through each room and add it to the dom
  rooms.forEach((room) => {
    roomList.innerHTML += `<li><span class="glyphicon glyphicon-lock"></span>${room.roomTitle}</li>`;
  });
};
