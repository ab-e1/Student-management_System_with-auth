const { Router } = require("express");
const studentServices = require("../controller/studentController.js");
const { validateStudent } = require("../middleware/validation.js");
const roleCheck = require("../middleware/roleMiddleware.js");
const auth = require("../middleware/authMiddleware.js");

const router = Router();

router.get("/", studentServices.getAllStudents);
router.get("/stats", studentServices.getStats);
router.get("/:id", studentServices.getStudentById);
router.post(
  "/",
  auth,
  roleCheck("admin"),
  validateStudent,
  studentServices.createStudent,
);
router.put(
  "/:id",
  auth,
  roleCheck("admin"),
  validateStudent,
  studentServices.updateStudent,
);
router.patch(
  "/:id",
  auth,
  roleCheck("admin"),
  validateStudent,
  studentServices.updateStudent,
);
router.delete("/:id", auth, roleCheck("admin"), studentServices.deleteStudent);

module.exports = router;
