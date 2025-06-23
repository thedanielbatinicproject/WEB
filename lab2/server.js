const express = require('express');
const session = require('express-session');
const path = require('path');
const os = require('os');

const app = express();
const port = 3000;

// Konfiguracija sessiona
app.use(session({
  secret: 'sesija',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 5} // 10 sati
}));

// Parsiranje tijela zahtjeva
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Statičke datoteke
app.use(express.static(path.join(__dirname, 'public')));

// Postavljanje EJS-a
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rute
const homeRoutes = require('./routes/home.routes');
const cartRoutes = require('./routes/cart.routes');

app.use('/home', homeRoutes);
app.use('/cart', cartRoutes);


// Defaultni redirect na home
app.get('/', (req, res) => {
  res.redirect('/home');
});

// Pokretanje servera
app.listen(port, () => {
  const ifaces = os.networkInterfaces();
  let localIp = 'localhost';
  for (const iface of Object.values(ifaces)) {
    for (const addr of iface) {
      if (addr.family === 'IPv4' && !addr.internal) {
        localIp = addr.address;
        break;
      }
    }
  }
  console.log(`Server pokrenut na adresi: http://${localIp}:${port}`);
});