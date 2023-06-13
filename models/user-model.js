const mongoose = require("mongoose");
// importing mongoose

const Schema = mongoose.Schema;
// initializing schema taking it from mongoose

const userSchema = new Schema({
    // id is auto created 
    name : {
        type : String , 
        required : true , 
    },
    surname : {
        type : String , 
        required : true , 
    },
    email : {
        type : String , 
        required : true , 
    },
    issuedBook : {
        type : mongoose.Schema.Types.ObjectId , 
        // since ids will be auto - generated and this is a foreign key from books table that's why we write like this
        
        ref : "Book" ,
        // ref ---> refer Book schema for type which is their primary key which is auto generated
        // Book is the schema of Book.json file stored in models --> book-models.js

        required : false , 
        // false since everyone doesn't have an issuedBook 
    },
    returnDate : {
        type : String , 
        required : false , 
    },
    subscriptionType : {
        type : String , 
        required : true , 
    },
    subscriptionDate : {
        type : String , 
        required : true , 
    },
},
{
    timestamps : true ,
}
);

module.exports = mongoose.model("User" , userSchema);