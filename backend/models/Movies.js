const mongoose = require('mongoose');


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



MovieSchema.pre('save', function (callback){
    if (this.password && this.isModified('password')) {
        console.log(this.password);
        // this.password = hashPassword(this.password);
    }
    callback();
});



module.exports = mongoose.model('Movie', MovieSchema);


