
// Import and Connect to mongodb
let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/movies-group-3");

let db = mongoose.connection;

const us = db.collection('users');
const movies = db.collection('movies');
const bcrypt = require('bcrypt');
const salts = 11;


// Creates a user when the register button is pressed
exports.createUser = (req, res) => {

    let User = require('./../models/User.js');
    // Creates new user model
    let newUser = new User({
        firstName: req.body.fName,
        lastName: req.body.lName,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save() // Saves to Database
    .then((record) => {
            // Return to static page to use
            res.json({
                message: 'successs',
                description: 'User information has successfully been saved.',
                user: record
            });
        })
    .catch(error => {
            res.json({
                message: 'error',
                description: 'Could not save user information to the database. Sorry :(',
                user: null
            });
    });
}


exports.signIn = (req, res) => {
    // finds a matching email in the database
    let account = us.findOne({'email': req.body.email})
    .then(result => {
        // Compares the password given to the one stored
        bcrypt.compare(req.body.password, result.password, function (err, ress) {
            if (err) {
                console.log(err);
            } 

            if (ress) {
                req.session.user = result;
                res.json(result);
            } else {
                res.json({
                    message: "Incorrect Password"
                })

            }
        })


    })
}

// likes a movie and sends back the updated coookie
exports.likeMovie = (req, res) => {

    let movie = movies.findOne({'title': req.body.title, 'year': req.body.year})
    .then(result => {
        let getUser = us.updateOne({'email': req.session.user.email}, {"$push":{"likedMovies": result}})
        .then(daUser => {
            let f = us.findOne({'email': req.session.user.email})
            .then(data => {
                req.session.user = data;
                res.json(data);


            })
        })
    })

}


// unlikes a movie and sends back the updated coookie
exports.unlikeMovie = (req, res) => {

    let movie = movies.findOne({'title': req.body.title, 'year': req.body.year})
    .then(result => {
        let getUser = us.updateOne({'email': req.session.user.email}, {"$pull":{"likedMovies": result}})
        .then(daUser => {
            let f = us.findOne({'email': req.session.user.email})
            .then(data => {
                req.session.user = data;
                res.json(data);


            })
        })
    })

}
