const express = require("express")
const router = express.Router();
const authController = require("../controller/authController");
const validate = require("../middleware/validate/validate")
const schema = require("../schemas/userSchema")



router.post("/login", validate(schema.postLoginSchema), authController.PostLoginController)
router.post("/register", validate(schema.createSchema), authController.CreateUserControllers)

// User Bura için güvenlik lazım gibi
router.get("/:id", validate(schema.getByIdSchema), authController.getById)


module.exports = router;