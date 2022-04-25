const {bot} = require("./bot")
require("./socket")
const express = require("express")
const app = express()
const {getLogs} = require("./lib/logger")
// const {fromCurrency, toCurrency, getSign} = require("./lib/currency");
const { getInfo } = require("./lib/room");
const { getName } = require("./lib/members")

app.use(express.static("public"))
app.use(express.json())

// app.get("/to/:currency/:count", (req, res) => {
//     const {count, currency} = req.params
//     const result = toCurrency(count, currency.toUpperCase())
//     res.send(`${result}${getSign(currency.toUpperCase())}`)
// })

// app.get("/from/:currency/:count", (req, res) => {
//     const {count, currency} = req.params
//     const result = fromCurrency(count, currency.toUpperCase())
//     res.send(`${result}${getSign("RUB")}`)
// })

app.post("/chats/:chatId/send", (req, res) => {
    bot.sendMessage(req.params.chatId, req.body.message)
    res.send(req.body.message)
})

app.get("/logs", (req, res)=>{
    const {chatId} = req.query
    console.log(chatId)
    res.json({
        items:getLogs(chatId)
    })
})

app.get("/rooms", (req, res)=>{
    const rooms = getInfo()
    res.json({
        items:rooms
    })
})

app.get("/rooms/:roomId/logs", (req, res)=>{
    const logs = getLogs(req.params.roomId)
    res.json({
        items:logs.map((log)=>{
            return {
                ...log,
                from:getName(log.from)
            }
        })
    })
})

app.listen(3000, ()=>{
    console.log("Server started on http://localhost:3000")
})