const { Router } = require("express");
const userController = require("../controller/userController.js");
const auth = require("../middleware/authMiddleware.js");
const roleCheck = require("../middleware/roleMiddleware.js");

const router = Router();

router.get("/", auth, roleCheck("admin"), userController.getAllUsers);

module.exports = router;
