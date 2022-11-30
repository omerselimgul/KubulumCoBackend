const { CustomError } = require("../../helpers/error/CustomError")
const jwt = require("jsonwebtoken")
const { getByUserId } = require("../../repository/authorRepository")

const getAccessToRoute = async (req, res, next) => {
    const { token } = req.cookies
    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
            const { Username, Userpassword, UserId } = decodedToken
            req.body.Username = Username
            req.body.Userpassword = Userpassword
            req.body.UserId = UserId
            return next();
        } catch (error) {
            return next(new CustomError(error, 400))
        }
    } else {
        return next(new CustomError("Giriş yapınız", 400))
    }
}
const roleControl = async (req, res, next) => {

    let data = await getByUserId(req.body.UserId)
    if (data) {
        let ClubId = req.body.Club
        let control = await data.find(a => a.ClubId === ClubId)
        if (control) {
            return next()
        } else {
            return next(new CustomError("Yetkiniz yoktur", 400))
        }
    } else {
        return next(new CustomError("Yetkiniz yoktur", 400))
    }
}
module.exports = {
    getAccessToRoute,
    roleControl
}