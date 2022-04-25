const socket = io("http://localhost:4410");

socket.on("chat", (data) => {
  const { type, name, params } = data;
  if (type === "message") {
    addMessage({
      name,
      text: params.text,
    });
  }
});

const chatFormEl = document.querySelector("#chat-form");
const messagesEl = document.querySelector("#messages");
const msgEl = document.querySelector("#message")

const userName = "Admin";

const addMessage = ({ name, text }) => {
  const newMsgEl = document.createElement("div");
  newMsgEl.classList.add("toast", "show", "mb-3")
  newMsgEl.innerHTML = `
  <div class="toast-header">
      <strong class="me-auto">${name}</strong>
      <small>11 mins ago</small>
  </div>
  <div class="toast-body">
    ${text}
  </div>
  `;
  messagesEl.prepend(newMsgEl);
};

const fetchMessages = (roomId) => {
  messagesEl.innerHTML = ""
  fetch(`http://localhost:3000/rooms/${roomId}/logs`)
    .then(res => res.json())
    .then(data => {
      for (let item of data.items) {
        addMessage({ name: item.from, text: item.text })
      }
    })
}

fetchMessages(1)

const fetchRooms = () => {
  fetch("http://localhost:3000/rooms")
  .then(response => response.json())
  .then(result => {
    rooms = result.items
    for (let room of result.items) {
      const optionEl = document.createElement("option")
      optionEl.value = room.id
      optionEl.textContent = `${room.title} (${room.members.length})`
      roomsEl.append(optionEl)
    }
    renderRoom(result.items[0], wrapperEl)
  })
  .catch(error => console.log('error', error));
}

fetchRooms()

chatFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = msgEl.value;
  if (!text) {
    return
  }
  const room = roomsEl.value;
  msgEl.value = '';
  socket.emit("chat", {
    type: "message",
    name: userName,
    params: { text, room }
  });
});

const roomsEl = document.querySelector("#rooms")