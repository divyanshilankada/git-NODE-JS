const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))



// Import routes
const blogRoute = require('./routes/blog');


//Router MIddlewares
app.use(express.json());
app.use('/', blogRoute);


module.exports = app;
