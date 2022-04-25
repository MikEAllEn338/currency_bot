// /room info

const rooms = [
    {
        title:"Anime",
        description:"Some talking about anime",
        img:"/img/rooms/anime.jpg",
        id:1,
        members:[]
    },
    {
        title:"Books",
        description:"Some talking about books",
        img:"/img/rooms/book.png",
        id:2,
        members:[]
    },
    {
        title:"Comic books",
        description:"Some talking about Comic-books",
        img:"/img/rooms/comic-books.jpg",
        id:3,
        members:[]
    },
    {
        title:"Movies",
        description:"Some talking about movies",
        img:"/img/rooms/movies.jpg",
        id:4,
        members:[]
    },
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
const checkRoom = (membChatId) => {
    return rooms.find((el)=>el.members.includes(membChatId))
}
const remId = (membChatId, roomId) => {
    const room = rooms.find((el)=>el.id===roomId)
    if(room){
        if(room.members.includes(membChatId)){
            room.members.splice(room.members.indexOf(membChatId), 1)
            return [true, "You've left room"]
        }
        return [true, "You're not in this room"]
    }else{
        return [false, "This room doesn't exist"]
    }
}

const getRoom = (roomId)=>{
    return rooms.find((room)=>{
        return roomId===room.id
    })
}
module.exports = {getInfo, addId, checkRoom, remId, getRoom}