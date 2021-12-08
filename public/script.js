fetch("http://localhost:3000/from/EUR/1")
  .then(res => res.text())
  .then(data => {
    const eurSpan = document.querySelector(".eur")
    eurSpan.innerHTML = data
  })