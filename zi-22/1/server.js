const express = require('express');
const app = express();
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

//VAŽNOO
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const homeRoute = require('./routes/home.route.js');
const subRoute = require('./routes/subscribe.route.js');

app.use('/', homeRoute);
app.use('/subscribe', subRoute)


app.listen(3000);