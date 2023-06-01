// WE WRITE IN CURLY BRACES SINCE DATA MIGHT BE ADDED IN THESE FILES LIKE MORE ARRAYS MIGHT BE ADDED 
// THEN IT WILL BE COMPLEX TO DETERMINE WHICH TO USE SO WE ADD CURLY BRACES (for referrence :  DAY 39 , 1:48:00 )

const express = require("express");
// importing express

const router = express.Router();
// Initializing express

module.exports = router ;
// returning back the particular export back 

const {books} = require("../data/books.json");
// books database file

const {users} = require("../data/users.json");
// users database file



// http://localhost:8081/books
// ROUTES HERE WILL BE OF THIS TYPE
// after which the routes will be appended


/*
    Route : /
    full route : http://localhost:8081/books
    Method : GET
    Description : Get all books info
    Access : Public
    Parameters : None
*/
router.get("/" , (req , res) => {
    res.status(200).json({
        success : true , 
        data : books ,
    });
});



/*
    Route : /issued
    full route : http://localhost:8081/books/issued
    Method : GET
    Description : Get all issued books
    Access : Public
    Parameters : none
*/
router.get("/issued" , (req, res) => {
    const userWithTheIssuedBook = users.filter((each) => {
        // filter is used for MULTIPLE OCCURANCES 
        if(each.issuedBook) return each ;
        // if there's an issuedBook field return the whole info of that user
    });
    const issuedBooks = [] ;
    // empty array

    userWithTheIssuedBook.forEach((each) => {
        // for each loop
        // loop will iterate over as many users as there are with issued books
        
        const book = books.find((book) => (book.id === each.issuedBook));
        // matching id from users file and books file if they match then store the 3 values as an array 

        book.issuedBy = each.name ; 
        book.issuedDate = each.issuedDate ;
        book.returnDate = each.returnDate ;

        issuedBooks.push(book);
        // store above 3 values for display and push in issuedBooks array defined above
    });
    if(issuedBooks.length===0){
        // if no issued book found
        return res.status(404).json({
            success : false , 
            message : "No Issued Books Found" ,
        });
    }
    return res.status(200).json({
        success : true , 
        message : "The Issued Books Are" , 
        data : issuedBooks ,
    });
});





/*
    Route : /:id
    full route : http://localhost:8081/books/:id  OR http://localhost:8081/books?id=1
    WE WONT BE WRITITNG :ID WE WILL BE WRITING THE ID NUMBER
    
    Method : GET
    Description : Get book by id
    Access : Public
    Parameters : id
*/
router.get("/:id" , (req , res) => {
    const {id} = req.params ;
    const book = books.find((each)=> each.id ===id)
    // search each and every element and FIND this ID
    // FIND is used when we need only 1 value , FILTER when we need multiple
    
    if(!book)
    {
        return res.status(404).json({
            success : false , 
            message : "Book Not Found , this ID doesn't exist" ,
        });
    };
    return res.status(200).json({
        success : true , 
        message : "Book Found , by their ID" , 
        data : book
    });
});





