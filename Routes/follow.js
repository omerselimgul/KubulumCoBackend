const express = require("express")
const router = express.Router()
const followController = require("../controller/followController")

router.route("/").post(followController.follow)

module.exports = router