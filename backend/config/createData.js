let MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

console.log(process.env.MONGO_URL)

MongoClient.connect(process.env.MONGO_URL, function(err, db){
    if (err) throw err;
    console.log("Database created");
    db.close();
})
