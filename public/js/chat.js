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
  msgEl.value = '';
  socket.emit("chat", {
    type: "message",
    name: userName,
    params: {text}
  });
});
