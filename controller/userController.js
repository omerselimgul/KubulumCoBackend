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
        req.body.Email = req.body.Email ?? beforeUserData.Email
        req.body.Universite = req.body.Universite ?? beforeUserData.UniversityId
        req.body.Birthdate = req.body.Birthdate ?? beforeUserData.Birthdate
        req.body.Cinsiyet = req.body.Cinsiyet ?? beforeUserData.Cinsiyet
        req.body.Bolum = req.body.Bolum ?? beforeUserData.Bolum

        const data = await userRepository.updateUser(req.body)
        if (data !== null) {
            delete data?.Userpassword
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
        if (req?.body?.Username && req?.body?.UserId) {
            const token = jwt.sign({
                Username: req?.body?.Username,
                UserId: req?.body?.UserId,
                Email: req?.body?.Email,
                Universite: req.body.Universite,
                Birthdate: req.body.Birthdate,
                Bolum: req.body.Bolum,
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
        const user = await userRepository.getUserByIdWithPassword(req.body.UserId)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Kullanıcı bulunamadı."
            })
        }
        if (req.body.oldPassword !== user?.Userpassword) {
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
            req.body.Username = data?.Username
            req.body.Email = data?.Email
            req.body.Universite = data?.Universite
            req.body.Birthdate = data?.Birthdate
            req.body.Cinsiyet = data?.Cinsiyet
            req.body.Bolum = data?.Bolum
            next()
        } else {
            return res.status(500).json({
                success: false,
                message: "Bir hata oluştu"
            })
        }
    } catch (err) {
        return next(new CustomError(err, 500))
    }
}


const updateProfileImage = async (req, res, next) => {
    try {
        const user = await userRepository.getById(req.body.UserId)
        if (!user) {
            return next(new CustomError("Kullanıcı bulunamadı.", 404))
        }
        if (req.files?.media !== undefined) {
            const buffer = Buffer.from(req.files?.media.data, 'base64')
            const base64str = buffer.toString("base64")
            req.body.media = base64str
        } else {
            return next(new CustomError("Resim yüklenmedi.", 400))
        }
        const data = await userRepository.updateProfileImage(req.body?.media, req.body.UserId)
        if (!data) {
            return next(new CustomError("Bir hata olustu", 500))
        }
        return res.status(200).json({
            success: true,
            message: "Profil resmi güncellendi",
            data: data
        })

    } catch (err) {
        return next(new CustomError(err, 500))
    }
}

module.exports = {
    getCurrentUser,
    getById,
    EditUser,
    EditUserCookieInfo,
    changePassword,
    updateProfileImage
}