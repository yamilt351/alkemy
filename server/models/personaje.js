const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const personajeSchema = new Schema({
  imagen: {type: String},
  nombre: {type: String, required: true},
  edad: {type: Number, required: true},
  peso: {type: Number, required: true},
  historia: {type: String, required: true},
  peliculasYseries: {type: String, required: true},
});
module.exports = mongoose.model("Personajes", personajeSchema);
