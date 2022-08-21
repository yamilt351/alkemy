const router = require("express").Router();
const Peliculas = require("../models/pelicula.js");
const {isAuthenticated} = require("../helper/helper.js");

router.get("/movies", async (req, res) => {
  const movies = await Peliculas.find();
  res.json(movies);
});
router.get("/movies/:id", async (req, res) => {
  const {movies_id} = req.params;
  const movies = await Peliculas.findById(movies_id).then((movie) => {
    res.json(movie).catch((error) => {
      res.json({error: error.message});
    });
    res.json(movies);
  });
});

router.post("/upload/newMovie", isAuthenticated, async (req, res) => {
  const {imagen, titulo, fecha, clasificacion, personajes} = req.body;
  const movie = new Peliculas({
    imagen,
    titulo,
    fecha,
    clasificacion,
    personajes,
  });
  const nombrePelicula = await Peliculas.findOne({nombre: nombre});
  if (nombrePelicula) {
    res.send({message: "movie already exists"});
  } else {
    await movie.save();
    if (!movie) {
      return res.status(400).json({error: "Something went wrong"});
    } else {
      res.json({
        message: "movie uploaded succefully",
      });
    }
  }
});

router.put("/update/updated-Movie/:id", isAuthenticated, async (req, res) => {
  const {imagen, titulo, fecha, clasificacion, personajes} = req.body;
  const Update = {imagen, titulo, fecha, clasificacion, personajes};
  await Peliculas.findByIdAndUpdate(req.params.id, Update);
  if (!(await Peliculas.findByIdAndUpdate(req.params.id, Update))) {
    return res.status(400).json({error: "Something went wrong"});
  } else {
    res.json({message: "movie edited succefully"});
  }
});

router.delete(
  "/delete/deleted-movie/:id",
  isAuthenticated,
  async (req, res) => {
    const movie = await Peliculas.findByIdAndDelete(req.params.id);
    if (!movie) {
      res.status(404).json({
        status: 404,
        message: "movie not found",
      });
    } else {
      res.json({message: "movie deleted succefully"});
    }
  }
);

router.get("/search/movie=?/:key", async (req, res) => {
  const movie = await Peliculas.find({
    $or: [{name: {$regex: req.params.key}}],
  });
  res.send(movie);
});
