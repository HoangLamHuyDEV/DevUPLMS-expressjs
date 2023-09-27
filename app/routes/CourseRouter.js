const CourseController = require("../controllers/CourseController");
const { authorize } = require("../middlewares/authorizeMiddleware");
const router = require("express").Router();
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/insert",authenticateToken,authorize(["admin"]),CourseController.InsertCourse);
router.post("/",authenticateToken,authorize(["admin"]),CourseController.GetAllCourses);

module.exports = router;