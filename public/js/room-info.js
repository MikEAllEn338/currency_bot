const rooms = [
    {
        title:"Anime",
        description:"Some talking about anime",
        img:"/img/rooms/anime.jpg",
        id:1
    },
    {
        title:"Books",
        description:"Some talking about books",
        img:"/img/rooms/book.png",
        id:2
    },
    {
        title:"Comic books",
        description:"Some talking about Comic-books",
        img:"/img/rooms/comic-books.jpg",
        id:3
    },
]

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