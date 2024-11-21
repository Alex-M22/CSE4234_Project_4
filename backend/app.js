const express = require("express");
const fs = require('fs');
const cors = require('cors');
const path = require('path');
let mongoose = require('mongoose');
let MongoClient = require('mongodb').MongoClient;


let User = require('./models/User.js');
let Movie = require('./models/Movies.js');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;



MongoClient.connect(process.env.MONGO_URL, function(err, db){
    if (err) throw err;
    console.log("Database created");
    db.close();
})

mongoose.connect(process.env.MONGO_URL);

let db = mongoose.connection;


db.on('open', function() {

    const moviesDB = db.collection("movies");

    fs.readFile('./data/movies.json', function(err, data){
        if (err) throw err;

        const movies = JSON.parse(data);



        movies.map(movie => {
            const quer = {rank: movie.rank};
            let d = moviesDB.findOne(quer)
            .then(res => {
                if (res === null) {
                    let movObj = new Movie({
                        year: movie.year,
                        title: movie.title,
                        directors: movie.info.directors,
                        releaseDate: movie.info.release_date,
                        rating: movie.info.rating,
                        genres: movie.info.genres,
                        image: movie.info.image_url,
                        plot: movie.info.plot,
                        length: movie.info.running_time_secs,
                        actors: movie.info.actors,
                        rank: movie.rank


                }).save()

                }
            })

        });

    });
});


app.use(cors());

const root = path.join(__dirname, "client", "dist")
app.use(express.static(root))

app.get("/*", (req, res) => {
    res.sendFile(path.join(root,"index.html"), function(err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});




app.post('/api/register', (req, res) => {
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });

    newUser.save((error, record)=> {
        if (error) {
            res.json({
                message: 'error',
                description: 'Could not save user information to the database. Sorry :('
            });
        }

        else {
            res.json({
                message: 'successs',
                description: 'User information has successfully been saved.',
                user: record
            });
        }
    });
});


app.listen(port, () => {
    console.log(`Server running on ${port}`);
});


