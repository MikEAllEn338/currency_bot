const ID_ADMIN=1
const memberDictionary = {
    [ID_ADMIN]:"Admin"
}
const getName = (memberId) => {
    return memberDictionary[memberId]||"Anonymouse"
}
const setName = (memberId, name) => {
    memberDictionary[memberId]=name
}
module.exports={getName, setName, ID_ADMIN}