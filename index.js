const express = require ("express");
// installing express

const app = express();
// initializing our application which will use express

const UsersRouter = require("./Routes/Users");
// Routes related to users are stored inside "./Routes/Users"

const BooksRouter = require("./Routes/Books");
// Routes related to books are stored inside "./Routes/Books"


// const {users} = require("./data/users.json");
// // users variable will store users.json file data

// const {books} = require("./data/books.json");
// // books variable will store books.json file data

const port = 8081 ;

app.use(express.json()); 
// Start using the application with express.json format 

app.use("/users" , UsersRouter);
// if the route starts with "/users" then direct it to UsersRouter which will direct to "./Routes/Users"

app.use("/books" , BooksRouter);
// if the route starts with "/books" then direct it to BooksRouter which will direct to "./Routes/Books"



// http://localhost:8081
// ROUTES HERE WILL BE OF THIS TYPE 
// then other routes will be appended




// Home Page 
app.get("/" , (req , res) => {
    res.status(200).json({
        message : "Server is up and running :)"
    })
});



// For all other routes which are not defined or implemented
app.get("*" , (req , res) => {
    res.status(404).json({
        message : "This route doesn't exist"
    })
});



app.listen(port , () => {
    // browser will listen if port is free , if yes "Server is running ..." will be shown in terminal
    console.log(`Server is running at port ${port}`)
});


// http://localhost:8081