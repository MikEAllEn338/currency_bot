// /room info

const rooms = [
    {
        id:1,
        title:"first",
        members: []
    },
    {
        id:2,
        title:"second",
        members: []
    },
    {
        id:3,
        title:"third",
        members: []
    }
]

const getInfo = () => {
    return rooms
}
const addId = (membChatId, roomId) => {
    const room = rooms.find((el)=>el.id===roomId)
    if(room){
        if(!room.members.includes(membChatId)){
            room.members.push(membChatId)
            return [true, "You've joined this room"]
        }
        return [true, "You're already joined this room"]
    }else{
        return [false, "This room doesn't exist"]
    }
}
module.exports = {getInfo, addId}