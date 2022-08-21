const passport = require("passport");
const User = require("../models/user.js");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
    },
    async function (username, password, done) {
      const user = await User.findOne({username: username});
      if (!user) {
        return done(null, false, {message: "Invalid password or user"});
      } else {
        const match = await user.CheckPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false, {message: "Invalid password or user"});
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((_id, done) => {
  User.findById(_id, (err, user) => {
    done(err, user);
  });
});
