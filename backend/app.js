// Import modules
const express = require("express");
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const jsonParse = bodyParser.json();
const {addMovies} = require('./scripts/addMovies.js'); 
const session = require('express-session');
const router = require("./api/routing.js");

// Create app and set port
const app = express();
const port = 3000;

// create root to index.html
const root = path.join(__dirname, "client", "dist")

// create a session for cookies
app.use(session({
    secret:"verySecretSecret",
    resave: true,
    saveUninitialized: true,   
}))

// Set all the middleware and files that the app will use
app.use('/', express.static(root));
app.use(jsonParse);
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use("/api", router);


// Always send the static files from server
app.get("/*", (req, res) => {
    res.sendFile(path.join(root, "index.html"))
});

// When server is started, it is logged on console and 
// movie database will be filled
app.listen(port, () => {
    console.log(`Server running on ${port}`);
    addMovies();
});


