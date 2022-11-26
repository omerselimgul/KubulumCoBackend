const express = require("express")
const login = require("./auth")
const home = require("./home")
const router = express.Router();
const university = require("./university")
const club = require("./club")

router.use("/auth", login)
router.use("/home", home)
router.use("/university", university)
router.use("/club", club)

module.exports = router