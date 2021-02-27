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

module.exports = {
  ensureAuthenticated,
};
