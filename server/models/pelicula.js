const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const peliculaSchema = new Schema({
  imagen: {type: String},
  titulo: {type: String, required: true},
  fecha: {type: Date, required: true},
  clasificacion: {type: Number, default: 0},
  personajes: {type: String, required: true}
});
module.exports = mongoose.model("Peliculas", peliculaSchema);
