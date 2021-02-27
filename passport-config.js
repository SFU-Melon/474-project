const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/User");

function initializeStrategy(passport) {
  console.log("local strategy initialized");

  const authenticateUser = async (email, password, done) => {
    console.log(email, password);
    const user = await User.getUserByEmail(email);
    if (user) {
      bcrypt.compare(password, user.password, (err, matched) => {
        if (err) throw err;
        if (matched) {
          console.log("pw matched");
          return done(null, user);
        } else {
          console.log("pw not matched");
          return done(null, false, { message: "Incorrect password" });
        }
      });
    } else {
      return done(null, false, {
        message: "Email is not registered",
      });
    }
  };

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      authenticateUser
    )
  );

  // stores a cookie with user.id inside browser
  passport.serializeUser((user, done) => done(null, user.id));

  // decrypt cookie to get userId
  passport.deserializeUser(async (id, done) => {
    const user = await User.getUserById(id);
    console.log(`deserializing user: ${user.id}, ${user.email}`);
    return done(null, user);
  });
}

module.exports = initializeStrategy;
