const User = require("../models/User");
const userController = {};

userController.login = (req, res) => {
  console.log("hit Login endpoint");
  res.send("Logging in User.");
};

userController.register = (req, res) => {
  console.log("hit Registering endpoint");
  const user = new User("name", "abcsd");
  console.log(user.username);
  res.send("Registering User.");
};

module.exports = userController;
