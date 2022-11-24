const express = require("express")
const login = require("./auth")
const home = require("./home")
const router = express.Router();
const university = require("./university")

router.use("/auth", login)
router.use("/home", home)
router.use("/university", university)

module.exports = router