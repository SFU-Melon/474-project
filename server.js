// change this for production
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const schedule = require("node-schedule");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const initializeStrategy = require("./passport-config");
initializeStrategy(passport);

// Express session
app.use(
  session({
    secret: "SWqsVQjkcOocjZVVguJB",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  })
);
app.use(cookieParser("SWqsVQjkcOocjZVVguJB"));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//API routes
const router = require("./routes/router");
const s3Router = require("./routes/s3Router");
app.use("/api", router);
app.use("/api", s3Router);

// For deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const { TokenStore } = require("./routes/tokenstore");
schedule.scheduleJob("0 */12 * * *", () => {
  // runs every 12 hours to clean up expired tokens
  TokenStore.cleanUp();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
