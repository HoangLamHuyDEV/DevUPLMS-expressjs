const AuthController = require("../controllers/AuthController");
const { authorize } = require("../middlewares/authorizeMiddleware");
const router = require("express").Router();
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/register",authenticateToken,authorize(["admin"]),AuthController.Register);
router.post("/login", AuthController.Login);
module.exports = router;
