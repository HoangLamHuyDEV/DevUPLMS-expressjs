const CourseController = require("../controllers/CourseController");
const { authorize } = require("../middlewares/authorizeMiddleware");
const router = require("express").Router();
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/",authenticateToken,authorize(["admin"]),CourseController.InsertCourse);
router.get("/",authenticateToken,authorize(["admin"]),CourseController.GetAllCourses);
router.get("/:id",authenticateToken,authorize(["admin"]),CourseController.GetCoursesById);
module.exports = router;