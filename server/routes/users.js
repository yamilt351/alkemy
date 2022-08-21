const router = require("express").Router();
const User = require("../models/user.js");
const passport = require("passport");

// routes
router.get("/user/signin", (req, res) => {
  res.render("handleuser/signin");
});
router.get("/user/signup", (req, res) => {
  res.render("handleuser/signup");
});
// creating user


router.post("/auth/register", async (req, res) => {
  const {username, password, email, confirm_password} = req.body;
  const emailUser = await User.findOne({email: email});
  const usernameUser = await User.findOne({username: username});
  const newUser = new User({username, email, password});
  if (
    password.length == 0 ||
    confirm_password == 0 ||
    username.length < 3 ||
    email.length < 11 ||
    email.indexOf("@") == -1 ||
    email.indexOf(".") == -1
  ) {
    res.send({message: "insert valid data "});
  } else if (password != confirm_password) {
    res.send({message: "passwords dont match"});
  } else if (password.length < 8) {
    res.send({message: "your password should be longer"});
  } else if (emailUser || usernameUser) {
    res.send({message: "user already exists"});
  } else {
    newUser.save((err) => {
      if (err) {
        console.log(err);
        res.send({message: "something went wrong"});
      } else {
        console.log(newUser);
        res.status(200).send("user register sucefully");
      }
    });
  }
});

// authenticating user
router.post(
  "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/api/candidate",
    failureRedirect: "/user/signup",
  })
);
router.get("/user/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
module.exports = router;
