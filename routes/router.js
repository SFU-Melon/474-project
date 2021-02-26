const router = require("express").Router();
const userController = require("../controllers/UserController");
const { ensureAuthenticated } = require("./middlewares");

/******  Auth Routes ********/
router.post("/login", userController.login);
router.post("/signup", userController.signup);
router.get("/user", ensureAuthenticated, userController.getAuthUser);
router.get("/logout", userController.logout);

module.exports = router;
