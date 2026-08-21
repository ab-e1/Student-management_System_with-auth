const { Router } = require("express");
const authController = require("../controller/authController.js");
const { validateUser } = require("../middleware/validation.js");
const auth = require("../middleware/authMiddleware.js");

const router = Router();

router.post("/register", validateUser, authController.register);
router.post("/login", authController.login);
router.post("/logout", auth, authController.logout);
router.get("/me", auth, authController.me);

module.exports = router;
