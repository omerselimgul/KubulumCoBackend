const { CustomError } = require("../../helpers/error/CustomError");

const customErrorHandler = ((err, req, res, next) => {

    let customError = err;
    if (err.name === "TokenExpiredError") {
        res.status(customError.status || 500).json({
            success: false,
            message: "Yetkisiz Erisim"
        })
    }
    // if(err.code===11000){
    //     //dublicate Error
    //     customError=new CustomError("dublicate key found check your Input",400)
    // }
    res.status(customError.status || 500).json({
        success: false,
        message: customError.message
    })
})


module.exports = {
    customErrorHandler
}