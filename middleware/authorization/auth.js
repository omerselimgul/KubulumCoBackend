const { CustomError } = require("../../helpers/error/CustomError")
const jwt = require("jsonwebtoken")

const getAccessToRoute = async (req, res, next) => {
    // const { token } = req.cookies
    // if (token) {
    //     try {
    //         const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    //         const { Username, Userpassword, UserId } = decodedToken
    //         req.body.Username = Username
    //         req.body.Userpassword = Userpassword
    //         req.body.UserId = UserId

    //         if (req.params.id === req.body.UserId) {
    //             return next();
    //         } else {
    //             return next(new CustomError("Yetkisiz erisim", 400))
    //         }
    //     } catch (error) {
    //         return next(new CustomError(error, 400))
    //         // res.status(401).send({ message: "Yetkisiz erisim", success: false })
    //     }
    // } else {
    //     return next(new CustomError("Yetkisiz erisim", 400))
    // }
}

module.exports = getAccessToRoute