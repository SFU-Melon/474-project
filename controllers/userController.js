const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const lightFormat = require("date-fns/lightFormat");
const parse = require("date-fns/parse");
const { TokenStore } = require("../routes/tokenstore");
var { nanoid } = require("nanoid");
const Mails = require("../services/mail");
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
  return res.json({
    success: result,
  });
};

userController.getUserByUsername = async (req, res) => {
  const { username } = req.params;
  const result = await User.getUserByUsername(username);
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
    followers: result?.followers,
    following: result?.following,
  });
};

userController.editProfilePhoto = async (req, res) => {
  const { userId } = req.params;
  const { profilePhotoUrl } = req.body;
  const result = await User.editProfilePhoto(userId, profilePhotoUrl);
  return res.json({
    success: result,
  });
};

userController.editProfileInfo = async (req, res) => {
  const { userId } = req.params;
  const { fname, lname, email, dob } = req.body;
  const date = parse(dob, "dd/MM/yyyy", new Date());
  const dobFinal = lightFormat(date, "yyyy-MM-dd");
  const result = await User.editProfileInfo(
    userId,
    fname,
    lname,
    email,
    dobFinal
  );
  return res.json({
    success: result,
  });
};

userController.getUserStats = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.getStats(id);
    return res.json({
      success: true,
      stats: result,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      stats: result,
    });
  }
};

userController.resetPasswordRequest = async (req, res) => {
  const { username } = req.params;
  console.log(username);
  try {
    const toEmail = await User.getEmailFromUsername(username);
    console.log(toEmail);
    if (toEmail) {
      const token = nanoid();
      if (!TokenStore.updateUserToken(username, token)) {
        TokenStore.addToken(token, username);
      }
      const url = `http://localhost:3000/resetpassword/${username}/${token}`;
      await Mails.sendPasswordResetMail({ toEmail, url });
      return res.json({
        success: true,
        email: toEmail,
        message: "Email Sent.",
      });
    }
    return res.json({
      success: false,
      email: null,
      message: "No email found.",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "No email sent.",
    });
  }
};

userController.resetPassword = async (req, res) => {
  const { username } = req.params;
  const { password, token } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await User.resetPassword(username, hashed);
    if (result) {
      TokenStore.removeToken(token);
    }
    return res.json({
      success: result,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
    });
  }
};

userController.getTotalAmount = async (req, res) => {
  try {
    const { numofusers } = await User.getTotalAmount();
    return res.status(200).json({
      success: true,
      numofusers,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
    });
  }
};

module.exports = userController;
