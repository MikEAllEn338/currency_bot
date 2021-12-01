const axios = require('axios');

// Make a request for a user with a given ID
axios.get('https://www.cbr-xml-daily.ru/daily_json.js')
  .then(function (response) {
    for(let currency in response.data.Valute){
        rates[currency] = response.data.Valute[currency].Value
    }
  });

let rates = {
    "USD":70,
    "EUR":83
}

const signs = {
    "USD":"$",
    "EUR":"€",
    "RUB":"₽"
}
// const getUsdFromRub = (rub)=>{
//     return Math.floor(rub*100/rate)/100
// }

// const getRubFromUsd = (usd)=>{
//     return usd*rate
// }

const fromCurrency = (count, currency) => {
    return count*rates[currency]
}

const toCurrency = (count, currency) => {
    return Math.floor((count*100)/rates[currency])/100
}

const getSign = (currency) => signs[currency] || currency
module.exports = {fromCurrency, toCurrency, getSign}