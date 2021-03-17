const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const lightFormat = require("date-fns/lightFormat");
const parse = require("date-fns/parse");
const userController = {};

userController.login = (req, res, next) => {
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
  console.log(req.body);
  const { username, password, fname, lname, dob, email } = req.body.values;
  const { profileUrl } = req.body;
  const date = parse(dob, "dd/MM/yyyy", new Date());
  const dobFinal = lightFormat(date, "yyyy-MM-dd");
  try {
    const user = await User.getUserByUsername(username);
    if (user === null) {
      //hashing
      const hashed = await bcrypt.hash(password, 10);
      await User.save({
        username,
        hashed,
        fname,
        lname,
        dobFinal,
        email,
        profileUrl,
      });
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
  for (let i = 0; i < users.length; i++) {
    const result = await User.getFollowersAndFollowing(users[i].id);
    users[i].followers = result[0];
    users[i].following = result[1];
  }
  return res.json({
    users: users,
  });
};

userController.getUserById = async (req, res) => {
  const { id } = req.params;
  const result = await User.getUserById(id);
  console.log(result);
  return res.json({
    success: result,
  });
};

userController.getUserByUsername = async (req, res) => {
  const { username } = req.params;
  const result = await User.getUserByUsername(username);
  console.log(result);
  return res.json({
    success: result,
  });
};

userController.follows = async (req, res) => {
  const { user1_id, user2_id } = req.body;
  const result = await User.follows(user1_id, user2_id);
  return res.json({
    success: result,
  });
};

userController.unfollows = async (req, res) => {
  const { user1_id, user2_id } = req.body;
  const result = await User.unfollows(user1_id, user2_id);
  return res.json({
    success: result,
  });
};

userController.getFollowersAndFollowing = async (req, res) => {
  const { userId } = req.params;
  const result = await User.getFollowersAndFollowing(userId);
  return res.json({
    success: result,
  });
};

userController.getFollowersAndFollowingUsers = async (req, res) => {
  const { userId } = req.params;
  const result = await User.getFollowersAndFollowingUsers(userId);
  return res.json({
    success: true,
    followers: result.followers,
    following: result.following,
  });
};
module.exports = userController;
