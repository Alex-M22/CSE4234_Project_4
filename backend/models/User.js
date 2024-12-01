const mongoose = require('mongoose');
let Movie = require('./../models/Movies.js');
const bcrypt = require('bcrypt');
const salts = 11;

// Creates the User schema for mongodb
const UserSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, lowercase:true, required:true},
    password: {type: String, required:true},
    likedMovies : [mongoose.Schema.Types.ObjectId]
});



// turns the given password into a hashed passowrd
// before storing it in the database
UserSchema.pre('save', async function (callback){

    const salt = await bcrypt.genSalt(11);
    hpassword = await bcrypt.hash(this.password, salt);
    this.password = hpassword;

    callback();
});



module.exports = mongoose.model('User', UserSchema);


