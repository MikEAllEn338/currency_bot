const {bot} = require("./bot")
const express = require("express")
const app = express()
const {fromCurrency, toCurrency, getSign} = require("./lib/currency");
app.use(express.static("public"))
app.use(express.json())

app.get("/to/:currency/:count", (req, res) => {
    const {count, currency} = req.params
    const result = toCurrency(count, currency.toUpperCase())
    res.send(`${result}${getSign(currency.toUpperCase())}`)
})

app.get("/from/:currency/:count", (req, res) => {
    const {count, currency} = req.params
    const result = fromCurrency(count, currency.toUpperCase())
    res.send(`${result}${getSign("RUB")}`)
})

app.post("/chats/:chatId/send", (req, res) => {
    bot.sendMessage(req.params.chatId, req.body.message)
    res.send(req.body.message)
})

app.listen(3000, ()=>{
    console.log("Server started on http://localhost:3000")
})