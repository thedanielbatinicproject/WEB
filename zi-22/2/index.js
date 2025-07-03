const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

// Konfiguracija sjednice
app.use(session({
  secret: 'tajna_sifra',
  resave: false,
  saveUninitialized: true,
}));

// Ruta za promjenu načina prikaza
app.get('/toggle/:pathArg(*)', (req, res) => {
  if (!req.session.mode || req.session.mode === 'day') {
    req.session.mode = 'night';
  } else {
    req.session.mode = 'day';
  }

  const redirectPath = '/' + req.params.pathArg;
  res.redirect(redirectPath);
});

// Glavna ruta - odgovara na bilo koji put osim onih koji počinju s /toggle
app.get('*', (req, res) => {
  const path = req.path;

  // Inicijalno postavljanje načina ako nije definirano
  if (!req.session.mode) {
    req.session.mode = 'day';
  }

  const isDay = req.session.mode === 'day';
  const bgColor = isDay ? 'white' : 'black';
  const textColor = isDay ? 'black' : 'white';
  const modeText = isDay ? 'noćni' : 'dnevni';

  // HTML sadržaj
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Način prikaza</title>
    </head>
    <body style="background-color: ${bgColor}; color: ${textColor};">
      <h1>Trenutni put: ${path}</h1>
      <p><a href="/toggle${path}">Prebaci u ${modeText} način prikaza</a></p>
      <p><a href="/">Početna stranica</a></p>
    </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.write(html);
  res.end();
});

// Pokretanje poslužitelja
app.listen(port, () => {
  console.log(`Aplikacija pokrenuta na http://localhost:${port}`);
});
