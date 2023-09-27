const router = require("express").Router();
const AdminController = require("../controllers/AdminController");

router.post("/", AdminController.createAccount);
module.exports = router;