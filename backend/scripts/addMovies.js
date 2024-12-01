// Import modules
let mongoose = require('mongoose');
let MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
const express = require("express");
let Movie = require('./../models/Movies.js');


exports.addMovies = () => {

// Connect to mongo db database
mongoose.connect("mongodb://localhost:27017/movies-group-3");

let db = mongoose.connection;

// when connected
db.on('connected', function() {
    // take/create movies database
    const moviesDB = db.collection("movies");

    // Read the json file
    fs.readFile('./data/movies.json', function(err, data){
        if (err) throw err;

        // parse the data
        const movies = JSON.parse(data);


        // for each entry
        movies.map(movie => {
            // if movie is not already in database, by given unique "rank" from json
            const quer = {rank: movie.rank};
            let d = moviesDB.findOne(quer)
            .then(res => {
                if (res === null) {
                    // Create a movie object using the mongodb schema
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
}