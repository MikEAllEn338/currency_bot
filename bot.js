require("dotenv").config()

const TelegramBot = require('node-telegram-bot-api');
const { messageTypes } = require("node-telegram-bot-api/src/telegram");
const { setName } = require("./lib/members.js");
const RoomController = require("./controllers/Room")
const CurrencyController = require("./controllers/Currency")

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

// bot.onText(/\/echo (.+)/, (msg, match) => {

//   const chatId = msg.chat.id;
//   const resp = match[1];

//   bot.sendMessage(chatId, resp);
// });

bot.onText(/\/from (.+)/, (msg, match) => {
  try {
    CurrencyController.from(bot, msg, match[1].split(" "))
  } catch (error) {
    console.log(error)
  }
})

bot.onText(/\/to (.+)/, (msg, match) => {
  try {
    CurrencyController.to(bot, msg, match[1].split(" "))
  } catch (error) {
    console.log(error)
  }
})

bot.onText(/\/set (.+)/, (msg, match) => {
  try {
    const [command] = match[1].split(" ")
    if (command === "name") {
      const [, membName] = match[1].split(" ")
      setName(msg.chat.id, membName)
      bot.sendMessage(msg.chat.id, "Your name is " + membName)
    }
  } catch (error) {
    console.log(error)
  }
})

// /room info
// /room join <id>
// /room history <count>
// /room out

bot.onText(/\/room (.+)/, (msg, match) => {
  try {
    const [command] = match[1].split(" ")
    if (RoomController[command]) {
      RoomController[command](bot, msg.chat.id, match[1].split(" "))
    }
  } catch (error) {
    console.log(error)
  }
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(msg)
  if (msg.text.indexOf("/") === 0) {
    return
  }
  // bot.sendMessage(chatId, 'Got it. Sending "'+msg.text+'"');
  RoomController.message(bot, msg)
});
module.exports = { bot }