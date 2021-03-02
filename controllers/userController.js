const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const userController = {};

userController.login = (req, res, next) => {
  console.log("hit login");
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        success: false,
        user: null,
      });
    } else {
      req.logIn(user, (err) => {
        if (err) throw err;
        console.log("Successfully Authenticated");
        console.log(req.user);
        return res.json({
          success: true,
          user: req.user,
        });
      });
    }
  })(req, res, next);
};

/***** Assuming data is validated from client *****/
userController.signup = async (req, res) => {
  console.log("hit signup", req.body);
  const { username, password } = req.body;
  try {
    const user = await User.getUserByUsername(username);
    console.log("User: ", user);

    if (user === null) {
      //hashing
      const hashed = await bcrypt.hash(password, 10);
      await User.save({ username, hashed });
      console.log("saved user");
      return res.json({
        success: true,
      });
    } else {
      console.log("user exists");
      return res.json({
        success: false,
      });
    }
  } catch (err) {
    console.log(err.message);
  }
};

userController.getAuthUser = (req, res) => {
  console.log(req.user);
  return res.json({
    user: req.user,
  });
};

userController.logout = (req, res) => {
  if (req.user) req.logout();
  return res.json({
    user: req.user,
  });
};

module.exports = userController;
