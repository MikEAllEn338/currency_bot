const app = require("express")();
const {bot} = require("./bot");
const server = require("http").Server(app);
const io = require("socket.io")(server, { cors: {} });

const PORT = process.env.SOCKET_PORT || 4410;

io.on("connection", (socket) => {
  const eventName = "chat";
  socket.on(eventName, (data) => {
    console.log(data);
    bot.sendMessage(776240166, data.params.text)
    socket.broadcast.emit(eventName, data);
    socket.emit(eventName, data);
  });
  bot.socket = socket
//   bot.onText(/\/socket (.+)/, (msg, match) => {
//     socket.broadcast.emit(eventName, {
//         type: "message",
//         name: "Bot",
//         params: {
//             text: match[1]
//         }
//     });
//   })
});

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${PORT}`);
});