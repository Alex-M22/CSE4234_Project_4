const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type: String, lowercase:true, required:true},
    password: {type: String, required:true}
});



UserSchema.pre('save', function (callback){
    if (this.password && this.isModified('password')) {
        console.log(this.password);
        // this.password = hashPassword(this.password);
    }
    callback();
});



module.exports = mongoose.model('User', UserSchema);


