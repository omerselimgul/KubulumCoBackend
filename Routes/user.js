const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate/validate");
const auth = require("../middleware/authorization/auth");
const userController = require("../controller/userController");
const schema = require("../schemas/userSchema");
const upload = require("../middleware/upload/upload")
const uploadConfig = {folder : '/club'}

router
  .route("/profile/currentuser")
  .get(
    auth.getAccessToRoute,
    validate(schema.getCurrentUserSchema),
    userController.getCurrentUser
  );
router
  .route("/:id")
  .get(validate(schema.getByIdSchema), userController.getById);
router.put(
  "/",
  auth.getOnlyUserIdFromTokenToBody,
  validate(schema.editUserSchema),
  userController.EditUser,
  userController.EditUserCookieInfo
);

router
  .route("/password/change")
  .post(
    auth.getAccessToRoute,
    validate(schema.changePasswordSchema),
    userController.changePassword,
    userController.EditUserCookieInfo
  );

router.route("/profileimage/update").post(auth.getAccessToRoute)

module.exports = router;
