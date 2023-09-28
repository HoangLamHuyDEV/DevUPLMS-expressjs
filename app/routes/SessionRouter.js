const SessionController = require("../controllers/SessionController");
const { authorize } = require("../middlewares/authorizeMiddleware");
const router = require("express").Router();
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/",authenticateToken,authorize(["admin"]),SessionController.InsertSession);

module.exports = router;