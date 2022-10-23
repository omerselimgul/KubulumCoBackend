const dbconnection = require("./dbconnection")


const registerHandler = async (username, password) => {

    let data = await dbconnection.registerRequestOfUserTable(username, password)
        .then(response => {
            if (response) {
                return response.recordsets[0]
                // console.log(response.recordsets[0])
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
                // console.log(response.recordsets[0])
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