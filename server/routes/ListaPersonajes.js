const router = require("express").Router();
const Personajes = require("../models/personaje.js");
const {isAuthenticated} = require("../helper/helper.js");

router.get("/character", async (req, res) => {
  const character = await Personajes.find();
  res.json(character);
});

router.get("/character/detail/:id"),
  async (req, res) => {
    const {character_id} = req.params;
    await Personajes.findById(character_id).then((person) =>
      res.json(person).catch((error) => res.json(error))
    );
  };

router.post("/upload/newCharacter", isAuthenticated, async (req, res) => {
  const {imagen, nombre, edad, peso, historia, peliculasYseries} = req.body;
  const character = new Personajes({
    imagen,
    nombre,
    edad,
    peso,
    historia,
    peliculasYseries,
  });
  const nombreCharacter = await Personajes.findOne({nombre: nombre});
  if (nombreCharacter) {
    res.send({message: "character already exists"});
  } else {
    await character.save();
    if (!character) {
      return res.status(400).json({error: "Something went wrong"});
    } else {
      res.json({
        message: "character uploaded succefully",
      });
    }
  }
});

router.put(
  "/update/updated-character/:id",
  isAuthenticated,
  async (req, res) => {
    const {imagen, nombre, edad, peso, historia, peliculasYseries} = req.body;
    const Update = {imagen, nombre, edad, peso, historia, peliculasYseries};
    await Personajes.findByIdAndUpdate(req.params.id, Update);
    if (!(await Personajes.findByIdAndUpdate(req.params.id, Update))) {
      return res.status(400).json({error: "Something went wrong"});
    } else {
      res.json({message: "character edited succefully"});
    }
  }
);

router.delete(
  "/delete/deleted-character/:id",
  isAuthenticated,
  async (req, res) => {
    const character = await Personajes.findByIdAndDelete(req.params.id);
    if (!character) {
      res.status(404).json({
        status: 404,
        message: "Character not found",
      });
    } else {
      res.json({message: "character deleted succefully"});
    }
  }
);

router.get("/search/character/:key", async (req, res) => {
  const character = await Personajes.find({
    $or: [
      {name: {$regex: req.params.key}},
      {edad: {$regex: req.params.key}},
      {peliculasYseries: {$regex: req.params.key}},
    ],
  });
  res.send(character);
});

module.exports = router;
