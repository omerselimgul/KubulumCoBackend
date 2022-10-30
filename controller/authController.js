const jwt = require("jsonwebtoken")
const { registerHandler, getUserByUsername } = require("../DataBase/dbcontrollers");
const { CustomError } = require("../helpers/error/CustomError");

const PostLoginController = async (req, res, next) => {
    var { Username, Password } = req.body;
    if (Username && Password) {
        let userInfo = await getUserByUsername(Username)
        if (userInfo && (userInfo[0]?.Userpassword) === Password) {
            const token = jwt.sign({
                Username: Username,
                Password: Password,
                userid: userInfo[0].UserId,
                expiresIn: '1d',
                issuer: 'www.kulubum.co'
            }, process.env.SECRET_KEY)
            // res.header('Access-Control-Allow-Origin', req.headers.origin);
            // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.cookie('token',token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true }).json({ message: "Login  basarili", data: userInfo[0], success: true })
        } else {
            return next(new CustomError("Bilglieri yanlış girdiniz", 403))
        }
    } else {
        return next(new CustomError("Tüm alanları doldurunuz", 400))
    }


}
const RegisterControllers = async (req, res, next) => {
    let { Username, Password } = req.body
    if (Username === null || Password === null) {
        next(new CustomError("Tüm alanları doldurunuz ", 405))
    } else {
        try {
            registerHandler(req.body)
                .then(response => {
                    if (response) {
                        res.status(200).json({ message: "kayit basarili", data: response[0], success: true })
                        // .redirect('/api/login')
                        // .redirect("http://localhost:3000/home")
                    } else {

                        next(new CustomError("Kayitta hata olustu daha sonra tekrar deneyiniz!", 400))
                    }
                })
                .catch(err => {
                    next(new CustomError(err, 400))
                })
        } catch (error) {
            next(new CustomError(" Hashing işleminde hata olustu lütfen daha sonra tekrar deneyiniz ", 405))
        }

    }


}
module.exports = {
    PostLoginController,
    RegisterControllers
}