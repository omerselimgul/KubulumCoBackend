const express = require("express")
const login = require("./auth")
const home = require("./home")
const router = express.Router();

router.use("/auth", login)
router.use("/home", home)

module.exports = router