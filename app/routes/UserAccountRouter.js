const UserAccountController = require("../controllers/UserAccountController");
const { authorize } = require("../middlewares/authorizeMiddleware");
const router = require("express").Router();
const { authenticateToken } = require("../middlewares/authMiddleware");

router.get("/",authenticateToken,authorize(["admin"]),UserAccountController.getAllUser);
router.get("/school_Id/:schoolId",authenticateToken,authorize(["admin"]) ,UserAccountController.getUserBySchool);
router.put("/info",authenticateToken,authorize(["admin","user"]),UserAccountController.UpdateUserAccountInfo);
router.put("/password",authenticateToken,authorize(["admin","user"]),UserAccountController.ChangePassword);
router.delete("/",authenticateToken,authorize(["admin"]),UserAccountController.DeleteUserAccountByUsername);

module.exports = router;
