const express = require("express");
const router = express.Router();

const userController = require("../controller/userController.js");
const authenticate = require("../middleware/auth.js");
const update = require("../controller/updateProfile.js");
const reset = require("../controller/reset_password.js");
const forget = require("../controller/update_password.js")


router.post("/register", userController.registration);
router.post("/login", userController.logIn);
router.post("/update-profile", authenticate, update.updateProfile);
router.post("/reset-password", authenticate, reset.resetPassword);
router.post('/update-password', forget.requestPasswordReset)

router.post("/update-password2",  forget.update_password)  



  
module.exports = router;
