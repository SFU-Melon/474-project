const { TokenStore } = require("./tokenstore");

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("user is authenticated");
    return next();
  }
  console.log("user is not authenticated");
  return res.json({
    user: null,
  });
};

const ensureAuthorized = (req, res, next) => {
  const { token } = req.body;
  if (TokenStore.isValid(token)) {
    console.log("user is authorized");
    return next();
  }
  console.log("user is not authorized");
  return res.json({
    success: false,
    message: "user is not authorized",
  });
};

module.exports = {
  ensureAuthenticated,
  ensureAuthorized,
};
