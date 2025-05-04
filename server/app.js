const express =  require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const petRoutes = require("./routes/petRoutes.js");

// Declare express app ...
const app = express();

// Declare modules used in the app ...
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve files from the 'uploads' directory ...
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Declare routes ...
app.use('/pets', petRoutes);

module.exports = app;