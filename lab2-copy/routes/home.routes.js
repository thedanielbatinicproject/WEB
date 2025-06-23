const express = require('express');
const router = express.Router();
const data = require('../data/car-data.js');

// GET /home
router.get('/', (req, res) => {
  res.render('home', { categories: data.categories });
});

// GET /home/getCategories -> ZA UZIMANJE PODATAKA
router.get('/getCategories', (req, res) => {  
  res.json(data.categories);
});

// GET /home/getProducts/:id
router.get('/getProducts/:id', (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = data.categories.find(cat => cat.id === categoryId);
  if (!category) {
    return res.status(404).json({ error: 'Kategorija nije pronađena' });
  }
  res.json(category.products);
});

module.exports = router;
