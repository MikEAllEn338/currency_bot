const { getInfo, addId, checkRoom, remId, getRoom } = require("../lib/room");
const { log, getLogs } = require("../lib/logger")
const { getName, ID_ADMIN } = require("../lib/members.js");


const info = (bot, chatId) => {
    const info = getInfo()
    let replay = ""
    for (let room of info) {
        replay += `room ${room.title} id:${room.id} members:${room.members.length}`
        replay += "\n"
    }
    bot.sendMessage(chatId, replay)
}
const join = (bot, chatId, params) => {
    const [, roomId] = params
    const curRoom = checkRoom(chatId)
    if (curRoom) {
        if (curRoom.id === +roomId) {
            bot.sendMessage(chatId, "You'r already in this room")
            return
        } else {
            bot.sendMessage(chatId, `You need to leave room${curRoom.id} to join room${roomId}`)
            return
        }
    }
    const [success, replay] = addId(chatId, +roomId)
    bot.sendMessage(chatId, replay)
}
const out = (bot, chatId) => {
    const curRoom = checkRoom(chatId)
    if (!curRoom) {
        bot.sendMessage(chatId, "You're not in the room")
    } else {
        const [, replay] = remId(chatId, curRoom.id)
        bot.sendMessage(chatId, replay)
    }
}
const history = (bot, chatId) => {
    const curRoom = checkRoom(chatId)
    if (!curRoom) {
        bot.sendMessage(chatId, "You're not in the room")
    } else {
        const logs = getLogs(curRoom.id)
        bot.sendMessage(chatId, logs.map((log) => {
            return `${getName(log.from)}: ${log.text}`
        }).join("\n"))
    }
}

const adminMessage=(bot, roomId, text)=>{
    const room = getRoom(+roomId)
    for (let member of room.members) {
        bot.sendMessage(member, `Admin: ${text}`)
    }
    log(
        +roomId,
        ID_ADMIN,
        text
    )
}

const message = (bot, msg) => {
    const curRoom = checkRoom(msg.chat.id)
    if (!curRoom) {
        bot.sendMessage(msg.chat.id, "You're not in the room")
        return
    }
    const roomMembers = curRoom.members.filter(member => member !== msg.chat.id)
    if (!roomMembers.length) {
        bot.sendMessage(msg.chat.id, "Unfortunately, you're alone here")
        return
    }
    log(
        curRoom.id,
        msg.chat.id,
        msg.text
    )
    for (let member of roomMembers) {
        bot.sendMessage(member, `${getName(msg.chat.id)}: ${msg.text}`)
    }
    bot.socket.emit("chat", {
      type: "message",
      name: getName(msg.chat.id),
      params: {
          text: msg.text
      }
  });
}

module.exports = {
    info,
    join,
    out,
    history,
    message,
    adminMessage
}