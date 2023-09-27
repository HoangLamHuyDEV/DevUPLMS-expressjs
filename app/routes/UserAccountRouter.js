const UserAccountController = require("../controllers/UserAccountController");
const { authorize } = require("../middlewares/authorizeMiddleware");
const router = require("express").Router();
const { authenticateToken } = require("../middlewares/authMiddleware");

router.post("/bySchoolId",authenticateToken,authorize(["admin"]) ,UserAccountController.getUserBySchool);
router.post("/update",authenticateToken,authorize(["admin","user"]),UserAccountController.UpdateUserAccountInfo);
router.post("/changepassword",authenticateToken,authorize(["admin","user"]),UserAccountController.ChangePassword);
router.post("/delete",authenticateToken,authorize(["admin"]),UserAccountController.DeleteUserAccountByUsername);

module.exports = router;
