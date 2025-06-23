const express = require('express');
const router = express.Router();
const data = require('../data/car-data.js');

// Helper za inicijalizaciju košarice u sesiji
function initCart(req) {
  if (!req.session.cart) {
    req.session.cart = {};
  }
}

// GET /cart
router.get('/', (req, res) => {
  initCart(req);
  // Pripremi proizvode iz košarice za prikaz
  const cartItems = [];
  let total = 0;
  for (const id in req.session.cart) {
    const quantity = req.session.cart[id];
    if (quantity > 0) {
      // Pronađi proizvod po id-u u svim kategorijama
      const product = data.categories.flatMap(cat => cat.products).find(p => p.id == id);
      if (product) {
        cartItems.push({
          ...product,
          quantity,
          subtotal: product.price ? product.price * quantity : 0
        });
        if (product.price) total += product.price * quantity;
      }
    }
  }
  res.render('cart', { cartItems, total });
});

// GET /cart/getAll
router.get('/getAll', (req, res) => {
  initCart(req);
  const items = [];
  for (const id in req.session.cart) {
    const quantity = req.session.cart[id];
    if (quantity > 0) {
      const product = data.categories.flatMap(cat => cat.products).find(p => p.id == id);
      if (product) {
        items.push({
          id: product.id,
          name: product.name,
          color: product.color,
          power: product.power,
          price: product.price,
          image: product.image,
          quantity
        });
      }
    }
  }
  res.json(items);
});

// POST /cart/add/:id
router.post('/add/:id', (req, res) => {
  initCart(req);
  const id = req.params.id;

  // Provjeri postoji li proizvod s tim ID-em
  const product = data.categories.flatMap(cat => cat.products).find(p => p.id == id);
  if (!product) {
    return res.status(404).json({ success: false, error: "Product not found" });
  }

  req.session.cart[id] = (req.session.cart[id] || 0) + 1;
  res.json({ success: true, cart: req.session.cart });
});

// POST /cart/remove/:id
router.post('/remove/:id', (req, res) => {
  initCart(req);
  const id = req.params.id;

  // Provjeri je li proizvod u košarici
  if (!req.session.cart[id]) {
    return res.status(400).json({ success: false, error: "Product not in cart" });
  }

  req.session.cart[id]--;
  if (req.session.cart[id] <= 0) {
    delete req.session.cart[id];
  }
  res.json({ success: true, cart: req.session.cart });
});

// POST /cart/delete/:id (potpuno ukloni proizvod iz košarice)
router.delete('/delete/:id', (req, res) => {
  initCart(req);
  const id = req.params.id;

  // Provjeri je li proizvod u košarici
  if (!req.session.cart[id]) {
    return res.status(400).json({ success: false, error: "Product not in cart" });
  }

  delete req.session.cart[id];
  res.json({ success: true, cart: req.session.cart });
});

// POST /cart/clear (isprazni cijelu košaricu)
router.delete('/clear', (req, res) => {
  req.session.cart = {};
  res.json({ success: true });
});


module.exports = router;