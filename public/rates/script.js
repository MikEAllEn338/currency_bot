// fetch("http://localhost:3000/from/EUR/1")
//   .then(res => res.text())
//   .then(data => {
//     const eurSpan = document.querySelector(".eur")
//     eurSpan.innerHTML = data
//   })
// fetch("http://localhost:3000/from/USD/1")
//   .then(res => res.text())
//   .then(data => {
//     const usdSpan = document.querySelector(".usd")
//     usdSpan.innerHTML = data
//   })
const getRateAndDisplay = (currency) => {
  fetch(`http://localhost:3000/from/${currency}/1`)
  .then(res => res.text())
  .then(data => {
    const eurSpan = document.querySelector("."+ currency.toLowerCase())
    eurSpan.innerHTML = data
  })
}

const createCurrencyElement = (currency) => {
  const pEl = document.createElement("p")
  pEl.innerHTML = `${currency} rate <span class="${currency.toLowerCase()}"></span>`
  const wrapperEl = document.querySelector(".rates")
  wrapperEl.append(pEl)
}

const arrCurrency = [
  "CAD",
  "USD",
  "EUR",
  "INR",
  "JPY"
]
for(let currency of arrCurrency){
  createCurrencyElement(currency)
  getRateAndDisplay(currency)
}