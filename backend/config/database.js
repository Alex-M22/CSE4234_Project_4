const mongoose = require('mongoose');

require('dotenv').config();
const fs = require('fs');


async function dataBaseMe() {


    mongoose.connect(process.env.MONGO_URL);

    let db = mongoose.connection;


    db.on('open', function() {

        const moviesDB = db.collection("movies");

        console.log('i open data');

        fs.readFile('./data/movies.json', function(err, data){
            if (err) throw err;

            const movies = JSON.parse(data);



            movies.map(movie => {
                const quer = {rank: movie.rank};
                let d = moviesDB.findOne(quer);
                console.log(d);
                if (d === null) {


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

            });

        });
        console.log("finish data")
    });

}

module.exports = {dataBaseMe}