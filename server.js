const express = require('express')
const app = express();
const routers = require("./Routes/index")
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser')
const { customErrorHandler } = require('./middleware/errors/customErrorHandler');

app.use(cookieParser())

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

dotenv.config({
    path: "./config/config.env"
})


app.use("/api", routers)
app.use(customErrorHandler)

app.use("", (req, res, next) => {
    // res.redirect('/api')
})
app.listen(4000, () => {
    console.log('listining port 4000')
})


