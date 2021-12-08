const express = require("express")
const app = express()
const {fromCurrency, toCurrency, getSign} = require("./lib/currency");
app.use(express.static("public"))

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

app.listen(3000, ()=>{
    console.log("Server started on http://localhost:3000")
})