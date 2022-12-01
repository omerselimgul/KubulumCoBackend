const express = require("express")
const router = express.Router()
const clubController = require("../controller/clubController")
const validate = require("../middleware/validate/validate")
const schema = require("../schemas/clubSchema")
const auth = require("../middleware/authorization/auth")

router.route("/").post(auth.getAccessToRoute, validate(schema.createSchema), clubController.create)
router.route("/").get(validate(schema.getListSchema), clubController.list)
router.route("/:id").get(validate(schema.getByIdSchema), clubController.getById)
router.route("/search/getByNameContains").get(validate(schema.getByNameContainsSchema), clubController.getByClubNameContains)
router.route("/:id").delete(validate(schema.deleteSchema), clubController.deleteClub)
router.route("/:id").patch(validate(schema.updateSchema), clubController.update)

module.exports = router