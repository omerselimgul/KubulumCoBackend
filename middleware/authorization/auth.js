const { CustomError } = require("d:/web/question-answer-rest-api/helpers/error/customerror")
const jwt = require("jsonwebtoken")

const getAccessToRoute = async (req, res, next) => {
    const { token } = req.cookies
    if (token) {
        try {
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
            const { username, password, userid } = decodedToken
            req.body.username = username
            req.body.password = password
            req.body.userid = userid
            res.send("<h1>Home Page</h1>")
            next();
        } catch (error) {
            console.log(error.name)
            next(new CustomError(error, 400))
            // res.status(401).send({ message: "Yetlisiz erisim", success: false })
        }
    } else {
        res.send("Token yok")
        // res.redirect("/api/login")
    }
}

module.exports = getAccessToRoute