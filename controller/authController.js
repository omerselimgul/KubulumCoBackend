const jwt = require("jsonwebtoken")
const userRepository = require("../repository/userRepository")
const { CustomError } = require("../helpers/error/CustomError");


const getById = async (req, res, next) => {

    const data = await userRepository.getById(req.params.id)
    if (data) {
        return res.status(200).json({ message: "Kullanici bulundu", data: data, success: true })
    } else {
        return next(new CustomError("Kullanici Bulunumadi", 404))
    }
}

const PostLoginController = async (req, res, next) => {
    const { Username, Userpassword } = req.body
    let userInfo = await userRepository.getByUserame(Username)
    if (userInfo && (userInfo?.Userpassword) === Userpassword) {
        const token = jwt.sign({
            Username: Username,
            Userpassword: Userpassword,
            UserId: userInfo.UserId,
            expiresIn: '1d',
            issuer: 'www.kulubum.co'
        }, process.env.SECRET_KEY)
        // res.header('Access-Control-Allow-Origin', req.headers.origin);
        // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }).json({ message: "Login  basarili", data: userInfo, success: true })
    } else {
        return next(new CustomError("Bilglieri yanlış girdiniz", 403))
    }
}
const CreateUserControllers = async (req, res, next) => {
    let { Username, Email } = req.body

    // Username Check
    let usernameControl = await userRepository.getByUserame(Username)
    if (usernameControl) {
        return res.status(400).json({
            success: false,
            message: "Kullanıcı adı eşsiz olmalı"
        })
    }

    // EmailCheck
    let emailControl = await userRepository.getByEmail(Email)
    if (emailControl) {
        return res.status(400).json({
            success: false,
            message: " Email adı eşsiz olmalı!"
        })
    }

    // Register Check
    const data = await userRepository.createdUser(req.body)
    if (data) {
        return res.status(200).json({ message: "kayit basarili", data: data, success: true })

    } else {
        next(new CustomError("Kayitta hata olustu daha sonra tekrar deneyiniz!", 400))
    }
}
module.exports = {
    getById,
    PostLoginController,
    CreateUserControllers
}