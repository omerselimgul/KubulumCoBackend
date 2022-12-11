const { CustomError } = require("../helpers/error/CustomError")
const userRepository = require("../repository/userRepository")
const jwt = require("jsonwebtoken")

const getCurrentUser = async (req, res, next) => {
    try {
        const data = await userRepository.getCurrentUser(req.body)
        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Kullanıcı bulunamadı."
            })
        }
        return res.status(200).json({
            success: true,
            message: "Giriş yapmış kullanıcı bilgileri getirildi",
            data: data
        })
    } catch (err) {
        return next(new CustomError(err, 500))
    }
}
const getById = async (req, res, next) => {
    try {
        const data = await userRepository.getById(req.params.id)
        if (data) {
            return res.status(200).json({ message: "Kullanici bulundu", data: data, success: true })
        } else {
            return next(new CustomError("Kullanici Bulunumadi", 404))
        }
    } catch (error) {
        return next(new CustomError(error, 404))
    }

}

const EditUser = async (req, res, next) => {
    try {
        const beforeUserData = await userRepository.getById(req.body.UserId)

        req.body.Username = req.body.Username ?? beforeUserData.Username
        req.body.Userpassword = req.body.Userpassword ?? beforeUserData.Userpassword
        req.body.Email = req.body.Email ?? beforeUserData.Email
        req.body.Universite = req.body.Universite ?? beforeUserData.Universite
        req.body.Birthdate = req.body.Birthdate ?? beforeUserData.Birthdate
        req.body.Cinsiyet = req.body.Cinsiyet ?? beforeUserData.Cinsiyet
        req.body.Bolum = req.body.Bolum ?? beforeUserData.Bolum
        const data = await userRepository.updateUser(req.body)
        if (data !== null) {
            next()
            // return res.status(200).json({ message: "Kullanici güncellendi", data: data, success: true })
        } else {
            return next(new CustomError("Kullanici güncellenemedi", 404))
        }
    } catch (Error) {
        return next(new CustomError(Error, 404))
    }

}
const EditUserCookieInfo = async (req, res, next) => {
    try {
        if (req?.body?.Username && req?.body?.Userpassword && req?.body?.UserId) {
            const token = jwt.sign({
                Username: req?.body?.Username,
                Userpassword: req?.body?.Userpassword,
                UserId: req?.body?.UserId,
                expiresIn: '1d',
                issuer: 'www.kulubum.co'
            }, process.env.SECRET_KEY)
            // res.header('Access-Control-Allow-Origin', req.headers.origin);
            // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.cookie('KulubumCo', token, { maxAge: 24 * 60 * 60 * 1000 }).json({ message: "İşlem  basarili", data: req.body, success: true })
        } else {
            return next(new CustomError("İşlem sırasında bir hata olustu", 403))
        }
    } catch (error) {
        return next(new CustomError(error, 403))
    }
}

const changePassword = async (req, res, next) => {
    try {
        const user = await userRepository.getById(req.body.UserId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Kullanıcı bulunamadı."
            })
        }
        if (req.body.oldPassword !== req.body.Userpassword) {
            return res.status(400).json({
                success: false,
                message: "Eski şifrenizi hatalı girdiniz."
            })
        }
        if (req.body.newPassword === req.body.Userpassword) {
            return res.status(400).json({
                success: false,
                message: "Eski şifreniz ve yeni şifreniz aynı olamaz."
            })
        }
        if (req.body.newPassword !== req.body.newPasswordConfirm) {
            return res.status(400).json({
                success: false,
                message: "Yeni şifre ve yeni şifre tekrarı birbiri ile uyuşmuyor."
            })
        }
        const data = await userRepository.changePassword(req.body.UserId, req.body.newPassword)
        if (data) {
            req.body.Userpassword = data.Userpassword
            next()
        }
        return res.status(500).json({
            success: false,
            message: "Bir hata oluştu"
        })
    } catch (err) {
        return next(new CustomError(err, 500))
    }
}


const updateProfileImage = async (req, res, next) => {

}

module.exports = {
    getCurrentUser,
    getById,
    EditUser,
    EditUserCookieInfo,
    changePassword
}