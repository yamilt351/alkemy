const helpers = {};
helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(404).redirect("/user/signin");
};
module.exports = helpers;
