const express = require("express")
const { RegisterControllers, PostLoginController } = require("../controller/authController");
const getAccessToRoute = require("../middleware/authorization/auth");

const router = express.Router();


router.post("/login", PostLoginController)

router.post("/register",RegisterControllers)
module.exports = router;