const express = require("express")
const login = require("./auth")
const home = require("./home")
const router = express.Router();
const university = require("./university")
const club = require("./club")
const follow = require("./follow")
const author = require("./author")
const user = require("./user")
router.use("/auth", login)
router.use("/home", home)
router.use("/university", university)
router.use("/club", club)
router.use("/follow", follow)
router.use("/author", author)
router.use("/user", user)

module.exports = router