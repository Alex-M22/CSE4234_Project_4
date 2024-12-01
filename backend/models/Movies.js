const mongoose = require('mongoose');

// Creates the Movie schema to store movie objects
const MovieSchema = new mongoose.Schema({
    year: Number,
    title: String,
    directors: [String],
    releaseDate: Date,
    rating: Number,
    genres: [String],
    image: String,
    plot: String,
    length: Number,
    actors: [String],
    rank: Number


    });



module.exports = mongoose.model('Movie', MovieSchema);
