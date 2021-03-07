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
      req.logIn(user, async (err) => {
        if (err) throw err;
        console.log("Successfully Authenticated");
        const res_user = req.user;
        const result = await User.getFollowersAndFollowing(res_user.id);
        res_user.followers = result[0];
        res_user.following = result[1];
        return res.json({
          success: true,
          user: res_user,
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

userController.getAuthUser = async (req, res) => {
  const res_user = req.user;
  const result = await User.getFollowersAndFollowing(res_user.id);
  res_user.followers = result[0];
  res_user.following = result[1];
  return res.json({
    user: res_user,
  });
};

userController.logout = (req, res) => {
  if (req.user) req.logout();
  console.log("logged out");
  return res.json({
    user: req.user,
  });
};

userController.getAllUsers = async (req, res) => {
  const users = await User.getAllUsers();
  return res.json({
    users: users,
  });
};

userController.follows = async (req, res) => {
  const { user1_id, user2_id } = req.body;
  const result = await User.follows(user1_id, user2_id);
  return res.json({
    success: result,
  });
};

module.exports = userController;
