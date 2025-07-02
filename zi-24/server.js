const express = require('express');
const app = express();
const path = require('path');
const session = require("express-session");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));



app.use(express.urlencoded({
    extended: true
}));

//VAŽNOO
app.use(express.json());

const homeRoute = require('./routes/home.route.js');
const movieRoute = require('./routes/movies.route.js');

app.use('/', homeRoute);
app.use('/movies', movieRoute)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}!`);
})