const LessonController = require("../controllers/LessonController");
const { authorize } = require("../middlewares/authorizeMiddleware");
const router = require("express").Router();
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/",authenticateToken,authorize(["admin"]),LessonController.InsertLesson);

module.exports = router;