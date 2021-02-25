const router = require("express").Router();
const userController = require("../controllers/UserController");

/******  User Controller Routes ********/
router.get("/user/login", userController.login);
router.get("/user/register", userController.register);

module.exports = router;
