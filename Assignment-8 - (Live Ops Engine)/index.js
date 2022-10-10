const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');



dotenv.config();

mongoose.connect("mongodb://localhost/offer");

app.listen(5000, () => console.log("Server is up on 5000"));