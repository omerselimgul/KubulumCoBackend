const dbconnection = require("./dbconnection")


const registerHandler = async (body) => {

    let data = await dbconnection.registerRequestOfUserTable(body)
        .then(response => {
            if (response) {
                return response.recordsets[0]
            }
            return null
        })
        .catch(err => {
            throw err;
        })
    return data;
}
const getUserByUsername = async (username) => {
    let data = await dbconnection.getUserByUsernameOfDb(username)
        .then(response => {
            if (response) {
                return response.recordsets[0]
            }
            return null
        })
        .catch(err => {
            throw err;
        })
    return data;
}
module.exports = {
    registerHandler,
    getUserByUsername
}