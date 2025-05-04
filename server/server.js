const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require('./app.js');

dotenv.config();

// declare environmental variables ...
const port = process.env.PORT || 5000;
const dbURL = process.env.MONGODB_URL;

// Connect to mongodb database ...
mongoose.connect(dbURL)
    .then(() => {
        console.log("MongoDB Database Connected");
    }).catch((error) => {
        console.log(error);
    });

// set app running state ...
app.listen(port, () => {
    console.log(`Backend Server running at http://localhost:${port}`);
});