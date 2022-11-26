const express = require("express")
const router = express.Router()
const clubController = require("../controller/clubController")

router.route("/").post(clubController.create)
router.route("/").get(clubController.list)
router.route("/:id").get(clubController.getById)
router.route("/search/getByNameContains").get(clubController.getByClubNameContains)
router.route("/:id").delete(clubController.deleteClub)
router.route("/:id").patch(clubController.update)

module.exports = router