let rooms = []

const renderRoom = (room, wrapperEl) => {
    const roomEl = document.createElement("div")
    roomEl.classList.add("card")
    roomEl.innerHTML = `
    <img src="${room.img}" class="card-img-top" alt="${room.title}">
    <div class="card-body">
        <h5 class="card-title">${room.title}</h5>
        <p class="card-text">${room.description}</p>
    </div>
    `
    wrapperEl.innerHTML = ""
    wrapperEl.append(roomEl)
}