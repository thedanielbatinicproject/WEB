const express = require('express');
const router = express.Router();
const movieManager = require("../backendSoftware/movieManager.js")

router.get('/', (req, res) => {
  const movies = movieManager.getMovies();
  res.render('movies', { movies });
});

// GET /movies/add
router.get('/add', (req, res) => {
  console.log("ADD RENDER")
  res.render('add');  
});

router.post("/add", (req, res) => {
    console.log("req.body:", req.body); // ispis u konzolu
    movieManager.addMovie(req.body.movieName, req.body.directorName);
    res.redirect("/movies");
});


router.post("/delete/:id", (req, res) => {
    const id = req.params.id
    movieManager.removeMovie(id)
    res.redirect("/movies")
})

module.exports = router;
