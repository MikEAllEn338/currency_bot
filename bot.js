require("dotenv").config()

const { log } = require("./lib/logger")

const TelegramBot = require('node-telegram-bot-api');
const { fromCurrency, toCurrency, getSign } = require("./lib/currency");
const { getInfo, addId, checkRoom, remId } = require("./lib/room");
const { messageTypes } = require("node-telegram-bot-api/src/telegram");

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// bot.onText(/\/echo (.+)/, (msg, match) => {

//   const chatId = msg.chat.id;
//   const resp = match[1];

//   bot.sendMessage(chatId, resp);
// });

// bot.onText(/\/rub (.+)/, (msg, match) => {
//   const count = getUsdFromRub(match[1])
//   bot.sendMessage(msg.chat.id, count)
// })

// bot.onText(/\/usd (.+)/, (msg, match) => {
//   try {
//     const count = fromCurrency(match[1],"USD")
//     bot.sendMessage(msg.chat.id, count)

//   } catch (error) {
//     console.log(error)
//   }
// })

// bot.onText(/\/eur (.+)/, (msg, match) => {
//   try {
//     const count = fromCurrency(match[1],"EUR")
//     bot.sendMessage(msg.chat.id, count)

//   } catch (error) {
//     console.log(error)  
//   }
// })

bot.onText(/\/from (.+)/, (msg, match) => {
  try {
    const [currency, count] = match[1].split(" ")
    const res = fromCurrency(count, currency.toUpperCase())
    const reply = `${res}${getSign("RUB")}`
    bot.sendMessage(msg.chat.id, reply)
    log(
      msg.chat.id,
      msg.from.id,
      msg.text
    )
    log(
      msg.chat.id,
      1,
      reply
    )
  } catch (error) {
    console.log(error)
  }
})

bot.onText(/\/to (.+)/, (msg, match) => {
  try {
    const [currency, count] = match[1].split(" ")
    const res = toCurrency(count, currency.toUpperCase())
    const reply = `${res}${getSign(currency.toUpperCase())}`
    bot.sendMessage(msg.chat.id, reply)
    log(
      msg.chat.id,
      msg.from.id,
      msg.text
    )
    log(
      msg.chat.id,
      1,
      reply
    )
  } catch (error) {
    console.log(error)
  }
})

bot.onText(/\/chat (.+)/, (msg, match) => {
  const [chatId, mes] = match[1].split(" ")
  bot.sendMessage(chatId, mes)
})

// /room info
// /room join <id>
// /room history <count>
// /room out

bot.onText(/\/room (.+)/, (msg, match) => {
  try {
    const [command] = match[1].split(" ")
    if (command === "info") {
      const info = getInfo()
      let replay = ""
      for (let room of info) {
        replay += `room ${room.title} id:${room.id} members:${room.members.length}`
        replay += "\n"
      }
      bot.sendMessage(msg.chat.id, replay)
    } else if(command==="join"){
      const [, roomId] = match[1].split(" ")
      const curRoom = checkRoom(msg.chat.id)
      if(curRoom){
        if(curRoom.id===+roomId){
          bot.sendMessage(msg.chat.id, "You'r already in this room")
          return
        }else{
          bot.sendMessage(msg.chat.id, `You need to leave room${curRoom.id} to join room${roomId}`)
          return
        }
      }
      const [success, replay] = addId(msg.chat.id, +roomId)
      bot.sendMessage(msg.chat.id, replay)
    }else if(command=="out"){
      const curRoom=checkRoom(msg.chat.id)
      if(!curRoom){
        bot.sendMessage(msg.chat.id, "You're not in the room")
      }else{
        const [, replay] = remId(msg.chat.id, curRoom.id)
        bot.sendMessage(msg.chat.id, replay)
      }
    }
  } catch (error) {
    console.log(error)
  }
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(msg)
  if(msg.text.indexOf("/")===0){
    return
  }
  // bot.sendMessage(chatId, 'Got it. Sending "'+msg.text+'"');
  const curRoom = checkRoom(msg.chat.id)
  if(!curRoom){
    bot.sendMessage(msg.chat.id, "You're not in the room")
    return
  }
  const roomMembers = curRoom.members.filter(member=>member!==msg.chat.id)
  if(!roomMembers.length){
    bot.sendMessage(msg.chat.id, "Unfortunately, you're alone here")
    return
  }
  for(let member of roomMembers){
    bot.sendMessage(member, msg.text)
  }
});
module.exports = { bot }