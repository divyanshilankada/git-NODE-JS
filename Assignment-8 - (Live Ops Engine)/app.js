const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const offersRoutes = require("./routes/offer");
const playerRegisterRoutes = require('./routes/player-register');
const playerLoginRoute = require('./routes/player-login');





app.use(bodyParser());
app.use("/Offers", offersRoutes);
app.use('/login', playerLoginRoute);
app.use("/register", playerRegisterRoutes);


module.exports = app;