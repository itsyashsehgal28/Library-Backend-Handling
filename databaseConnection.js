// This is a file for Database Connection

const mongoose = require("mongoose");
// importing mongoose 

function DbConnection() {
    // function for connection of database
    const DB_URL = process.env.MONGO_URL ;
    // url for mongoose database copied to .env file 

    mongoose.connect(DB_URL , {
        // To connect to mongoose through our DB_URL
        useNewUrlParser : true , 
        // default arguements  , to parse the passed URL
        useUnifiedTopology : true ,
    });
}

const db = mongoose.connection;
// making a connection and storing it in a variable DB

db.on("error" , console.error.bind(console , "Connection Errors"));
// if a connection error occurs then console this error

db.once("open" , function(){
    console.log("DB connected");
});
// if database is connected show DB connected 
// once means do this once only not again and again since database needs to be connected only once



module.exports = DbConnection ;
// exporting file to index.js
