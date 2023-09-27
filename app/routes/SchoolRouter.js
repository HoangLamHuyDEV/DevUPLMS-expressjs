const router = require("express").Router();
const SchoolController = require("../controllers/SchoolController");
const { authorize } = require("../middlewares/authorizeMiddleware");
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/insert",authenticateToken,authorize(["admin"]), SchoolController.InsertSchool);
module.exports = router;