const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const generoSchema = new Schema({
  imagen: {type: String},
  nombre: {type: String, required: true},
  peliculasYseries: {type: String, required: true},
});
module.exports = mongoose.model("Genero", generoSchema);
