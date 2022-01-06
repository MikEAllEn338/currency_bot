const logObjs = []
const log = (chatId, from, text) => {
    logObjs.push({ chatId, from, text })
}
const getLogs = (chatId) => {
    if (chatId) {
        return logObjs.filter((el) => {
            return chatId == el.chatId
        })
    }
    return logObjs
}
module.exports = {
    log,
    getLogs
}