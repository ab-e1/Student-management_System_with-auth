const { Router } = require("express");
const authController = require("../controller/authController.js");
const { validateUser } = require("../middleware/validation.js");

const router = Router();

router.post("/register", validateUser, authController.register);
router.post("/login", authController.login);

module.exports = router;
