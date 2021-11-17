const rate = 70
const rates = {
    "USD":70,
    "EUR":83
}
const getUsdFromRub = (rub)=>{
    return Math.floor(rub*100/rate)/100
}

const getRubFromUsd = (usd)=>{
    return usd*rate
}

const fromCurrency = (count, currency) => {
    return count*rates[currency]
}

module.exports = {getUsdFromRub, getRubFromUsd, fromCurrency}