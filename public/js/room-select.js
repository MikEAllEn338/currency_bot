const wrapperEl = document.querySelector(".room-info")

const roomSelect = document.querySelector(".controls select")

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