// Connect to mongodb
let mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/movies-group-3");
let db = mongoose.connection;
const coll = db.collection('movies');
const users = db.collection('users');

// return all movies
exports.getAllMovies = (req, res) => {
      let allMovies = coll.find({}).toArray()
      .then(result => {
            res.json(result);
      });
}

// return all genres from the given movies
exports.getGenres = (req, res) => {
      let genres = coll.distinct('genres')
      .then(result => {
            res.json(result);
      })     
}

// sort then return the highest ten movies of a given genre
exports.getTopTen = (req, res) => {
      const sort = {'rating':-1}

      let movies = coll.find({"genres": {"$in":[req.body.genre]}}).sort(sort).toArray()
      .then(result => {
            res.json(result.slice(0,10));
      });

}

// remove all movies from the database (programmer sanity checking)
exports.rmAll = (req, res) => {
      let movies = coll.deleteMany({})
      .then(result => {
            console.log("All movies removed from database");
            res.send(result);
      })
}

// remove all users from the database (programmer sanity checking)
exports.rmUsers = (reg, res) => {
      let allofem = users.deleteMany({})
      .then(result => {
            console.log("All Users removed");
            res.send(result);
      }) 
}