const express = require("express")
const router = express.Router()
const universityController = require("../controller/universityContoller")

router.route("/").post(universityController.create)
router.route("/").get(universityController.list)
router.route("/:id").get(universityController.getById)
router.route("/search/getByName").get(universityController.getByNameContains)
router.route("/:id").delete(universityController.deleteUniversity)

module.exports = router