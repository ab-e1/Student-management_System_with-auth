const { Router } = require("express");
const userServices = require("../services/userServices.js");
const auth = require("../middleware/authMiddleware.js");
const roleCheck = require("../middleware/roleMiddleware.js");

const router = Router();

router.get("/", auth, roleCheck("admin"), userServices.getAllUsers);

module.exports = router;
