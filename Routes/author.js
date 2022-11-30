const express = require("express")
const router = express.Router();
const authorController = require("../controller/authorController")
const validate = require("../middleware/validate/validate")
const schema = require("../schemas/authorSchema")
const authorization = require("../middleware/authorization/auth")



router.get("/byuserid", validate(schema.getByUserIdSchema), authorization.getAccessToRoute, authorController.getByUserId)
router.get("/bykulupid/:id", validate(schema.getByKulupIdSchema), authorization.getAccessToRoute, authorController.getByClubId)
router.post("/", validate(schema.addAuthorSchema), authorization.getAccessToRoute, authorization.roleControl, authorController.addAuthor)
router.delete("/", validate(schema.deleteAuthorSchema), authorization.getAccessToRoute, authorization.roleControl, authorController.deleteAuthor)
module.exports = router;