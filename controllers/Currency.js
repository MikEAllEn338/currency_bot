const { fromCurrency, toCurrency, getSign } = require("../lib/currency");
const { log } = require("../lib/logger")


const from = (bot, msg, params) => {
    const [currency, count] = params
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
}

const to = (bot, msg, params) => {
    const [currency, count] = params
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
}

module.exports = {
    from,
    to
}