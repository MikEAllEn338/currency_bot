// const rooms = [
//     {
//         id:1,
//         title:"First",
//         members: []
//     },
//     {
//         id:2,
//         title:"Second",
//         members: []
//     },
//     {
//         id:3,
//         title:"Third",
//         members: []
//     }
// ]

const wrapperEl = document.querySelector(".room-info")

renderRoom(rooms[0], wrapperEl)

const roomSelect = document.querySelector(".controls select")
for(const room of rooms){
    const el = document.createElement("option")
    el.value = room.id
    el.textContent = room.title
    roomSelect.append(el)
}

roomSelect.addEventListener("change", (event)=>{
    const room = rooms.find((nextRoom)=>{
        if(event.target.value==nextRoom.id){
            return true
        }else{
            return false
        }
    })
    renderRoom(room, wrapperEl)
    fetchMessages(room.id)
})