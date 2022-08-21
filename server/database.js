const mongoose = require("mongoose");

const URL =
  "mongodb+srv://leo:vimaga351@cluster0.4g3ly.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(URL)
  .then((db) => console.log("mongodb is on" + db))
  .catch((err) => console.error(err));

module.exports = mongoose;
