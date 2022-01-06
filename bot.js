require("dotenv").config()

const {log} = require("./lib/logger")

const TelegramBot = require('node-telegram-bot-api');
const {fromCurrency, toCurrency, getSign} = require("./lib/currency");

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

bot.onText(/\/chat (.+)/,(msg, match) => {
  const [chatId, mes] = match[1].split(" ")
  bot.sendMessage(chatId, mes)
})

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, 'Got it');
});
module.exports={bot}