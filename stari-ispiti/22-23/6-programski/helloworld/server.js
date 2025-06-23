const express = require('express');
const app = express();
const path = require('path');
const session = require("express-session");
const todoManager = require("./todo-manager")

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "tajna", // bilo koji string
  resave: false,
  saveUninitialized: true
}));

// Dodijeli userId ako ga nema
app.use((req, res, next) => {
  if (!req.session.userId) {
    req.session.userId = Math.random().toString(36).slice(2) + Date.now();
  }
  next();
});

app.use(express.urlencoded({
    extended: true
}));

app.use(express.static(path.join(__dirname, 'public')));

// Postavljanje EJS-a
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rute
const homeRoute = require('./routes/home.route');
const { json } = require('stream/consumers');

app.use('/', homeRoute);


app.post("/", (req, res) => {
  todoManager.addTodo(req.body.cat, req.body.con, req.session.userId);
  console.log(`KORISNIK ${req.session.userId} DODAO JE TODO: ` + JSON.stringify(todoManager.returnTodo(todoManager.getLatestId())))
  res.redirect("/");
});

let PORT=8080
const os = require("os")
app.listen(PORT, () => {
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
  console.log(`Server pokrenut na adresi: http://${localIp}:${PORT}`);
})