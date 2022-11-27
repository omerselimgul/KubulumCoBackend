const express = require("express")
const router = express.Router()
const universityController = require("../controller/universityContoller")
const validate = require("../middleware/validate/validate")
const schema = require("../schemas/universitySchema")

router.route("/").post(validate(schema.createSchema), universityController.create)
router.route("/").get(validate(schema.getListSchema), universityController.list)
router.route("/:id").get(validate(schema.getByIdSchema), universityController.getById)
router.route("/search/getByName").get(validate(schema.getByNameContainsSchema), universityController.getByNameContains)
router.route("/:id").delete(validate(schema.deleteSchema), universityController.deleteUniversity)

module.exports = router