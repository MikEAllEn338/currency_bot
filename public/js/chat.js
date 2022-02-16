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

const userName = "Barry";

const addMessage = ({ name, text }) => {
  const newMsgEl = document.createElement("div");
  newMsgEl.innerHTML = `
    <b>${name}</b> <span>${text}</span>
  `;
  messagesEl.prepend(newMsgEl);
};

chatFormEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = msgEl.value;
  const room = roomsEl.value;
  msgEl.value = '';
  socket.emit("chat", {
    type: "message",
    name: userName,
    params: {text, room}
  });
});

const roomsEl = document.querySelector("#rooms")
fetch("http://localhost:3000/rooms")
.then(response => response.json())
.then(result => {
  for(let room of result.items){
    // <option value="1">First</option>
    const optionEl = document.createElement("option")
    optionEl.value = room.id
    optionEl.textContent = `${room.title} (${room.members.length})`
    roomsEl.append(optionEl)
  }
})
.catch(error => console.log('error', error));