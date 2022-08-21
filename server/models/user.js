const mongoose = require("mongoose");
const {Schema} = require("mongoose");
const bcrypt = require("bcrypt");

const Rounds = 25;

const CreatedUserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  id: {type: String},
});

CreatedUserSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(document.password, Rounds, function (err, hash) {
      if (err) {
        return next(err);
      } else {
        document.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

CreatedUserSchema.methods.CheckPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", CreatedUserSchema);
