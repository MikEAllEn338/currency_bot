const memberDictionary = {}
const getName = (memberId) => {
    return memberDictionary[memberId]||"Anonymouse"
}
const setName = (memberId, name) => {
    memberDictionary[memberId]=name
}
module.exports={getName, setName}