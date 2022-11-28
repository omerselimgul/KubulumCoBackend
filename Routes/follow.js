const express = require("express")
const router = express.Router()
const followController = require("../controller/followController")
const validate = require("../middleware/validate/validate")
const schema = require("../schemas/followSchema")

router.route("/").post(validate(schema.followSchema), followController.follow)
router.route("/getFollowListByUserId").get(validate(schema.getFollowListByUserIdSchema), followController.getFollowListByUserId)
router.route("/getFollowersByClubId").get(validate(schema.getFollowerListByClubIdSchema), followController.getFollowersByClubId)

module.exports = router