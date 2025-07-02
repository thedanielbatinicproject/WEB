const express = require('express');
const router = express.Router();
const movieManager = require("../backendSoftware/movieManager.js")

// GET /home
router.get('/', (req, res) => {
  res.render('home');
  res.end();    
});

module.exports = router;
