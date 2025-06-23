var express = require('express');
var data = require('../data/data');
var { sessionDB } = require('../data/sessionDatabase');
var router = express.Router();

// Dodaj jedan komad proizvoda u košaricu
router.get('/add/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const product = getProductById(id);
    if (!product) return res.status(404).json({ error: 'Proizvod nije pronađen' });
    if (!req.session) return res.status(400).json({ error: 'Sesija nije pronađena' });
    if (!req.session.cart[id]) req.session.cart[id] = 0;
    req.session.cart[id]++;
    sessionDB.updateLastUsed(req.session.sessionID);
    res.json({ success: true, cart: req.session.cart });
});

router.post('/add/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const product = getProductById(id);
    if (!product) return res.status(404).json({ error: 'Proizvod nije pronađen' });
    if (!req.session) return res.status(400).json({ error: 'Sesija nije pronađena' });
    if (!req.session.cart[id]) req.session.cart[id] = 0;
    req.session.cart[id]++;
    sessionDB.updateLastUsed(req.session.sessionID);
    res.json({ success: true, cart: req.session.cart });
});


router.get('/remove/:id', function(req, res) {
    const id = parseInt(req.params.id);
    if (!req.session) return res.status(400).json({ error: 'Sesija nije pronađena' });
    if (req.session.cart[id]) {
        req.session.cart[id]--;
        if (req.session.cart[id] <= 0) delete req.session.cart[id];
        sessionDB.updateLastUsed(req.session.sessionID);
        res.json({ success: true, cart: req.session.cart });
    } else {
        res.status(404).json({ error: 'Proizvod nije u košarici' });
    }
});

router.delete('/remove/:id', function(req, res) {
    const id = parseInt(req.params.id);
    if (!req.session) return res.status(400).json({ error: 'Sesija nije pronađena' });
    if (req.session.cart[id]) {
        req.session.cart[id]--;
        if (req.session.cart[id] <= 0) delete req.session.cart[id];
        sessionDB.updateLastUsed(req.session.sessionID);
        res.json({ success: true, cart: req.session.cart });
    } else {
        res.status(404).json({ error: 'Proizvod nije u košarici' });
    }
});


router.get('/removeAll/:id', function(req, res) {
    const id = parseInt(req.params.id);
    if (!req.session) return res.status(400).json({ error: 'Sesija nije pronađena' });
    if (req.session.cart[id]) {
        delete req.session.cart[id];
        sessionDB.updateLastUsed(req.session.sessionID);
        res.json({ success: true, cart: req.session.cart });
    } else {
        res.status(404).json({ error: 'Proizvod nije u košarici' });
    }
});

router.delete('/removeAll/:id', function(req, res) {
    const id = parseInt(req.params.id);
    if (!req.session) return res.status(400).json({ error: 'Sesija nije pronađena' });
    if (req.session.cart[id]) {
        delete req.session.cart[id];
        sessionDB.updateLastUsed(req.session.sessionID);
        res.json({ success: true, cart: req.session.cart });
    } else {
        res.status(404).json({ error: 'Proizvod nije u košarici' });
    }
});

// Isprazni cijelu košaricu
router.get('/empty', function(req, res) {
    if (!req.session) return res.status(400).json({ error: 'Sesija nije pronađena' });
    req.session.cart = {};
    sessionDB.updateLastUsed(req.session.sessionID);
    res.json({ success: true, cart: req.session.cart });
});

// Prikaz košarice (renderanje cart.ejs s podacima iz sesije)
router.get('/', function(req, res, next) {
    if (!req.session) return res.status(400).json({ error: 'Sesija nije pronađena' });
    const cart = req.session.cart || {};
    // Pripremi detalje proizvoda
    const items = Object.entries(cart).map(([id, quantity]) => {
        const product = getProductById(parseInt(id));
        return product ? { id: product.id, name: product.name, price: product.price, image: product.image, quantity } : null;
    }).filter(Boolean);
    const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
    res.render('cart', { cartItems: items, totalPrice });
});

// Dohvati sve proizvode i količine iz košarice za trenutnog korisnika
router.get('/getAll', function(req, res) {
    if (!req.session) return res.status(400).json({ error: 'Sesija nije pronađena' });
    const cart = req.session.cart || {};
    // Pripremi detalje proizvoda
    const items = Object.entries(cart).map(([id, quantity]) => {
        const product = getProductById(parseInt(id));
        return product ? { id: product.id, name: product.name, price: product.price, quantity } : null;
    }).filter(Boolean);
    res.json({ cart: items });
});

function getProductById(productId) {
    for (const category of data.categories) {
        for (const product of category.products) {
            if (product.id === productId) {
                return product;
            }
        }
    }
    return null;
}

module.exports = router;