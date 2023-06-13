// WE WRITE IN CURLY BRACES SINCE DATA MIGHT BE ADDED IN THESE FILES LIKE MORE ARRAYS MIGHT BE ADDED 
// THEN IT WILL BE COMPLEX TO DETERMINE WHICH TO USE SO WE ADD CURLY BRACES (for referrence :  DAY 39 , 1:48:00 )

const express = require("express");
// importing express

const router = express.Router();
// Initializing express , we will write router.get instead of app.get

const {books} = require("../data/books.json");
// books database file

const {users} = require("../data/users.json");
// users database file


// const bookModel = require("../models/book-model");
// const userModel = require("../models/user-model");  
//              OR now we can write this together since both files are inside LOCAL index.js
const {userModel , bookModel} = require("../models/index");
// this has both the files imported , choose whatever approach you like

const { getAllBooks, getBookById, getAllIssuedBooks, addNewBook , updateBookById} = require("../controllers/book-controllers");


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
router.get("/" , getAllBooks);

/*
    THIS IS JSON APPROACH

    router.get("/" , (req , res) => {
        res.status(200).json({
            success : true , 
            data : books ,
        });
    });
*/




/*
    Route : /issued
    full route : http://localhost:8081/books/issued
    Method : GET
    Description : Get all issued books
    Access : Public
    Parameters : none
*/
router.get("/issued" , getAllIssuedBooks);

/*
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




/*
    Route : /:id
    full route : http://localhost:8081/books/:id  OR http://localhost:8081/books?id=1
    WE WONT BE WRITITNG :ID WE WILL BE WRITING THE ID NUMBER
    
    Method : GET
    Description : Get book by id
    Access : Public
    Parameters : id
*/

router.get("/:id" , getBookById);

/*
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
*/




/*
    Route : /
    full route : http://localhost:8081/books
    Method : POST
    Description : Add A New Book
    Access : Public
    Parameters : none
    Data : id , name , author , genre , price , publisher
*/

router.post("/" , addNewBook);

// router.post("/" , (req, res) => {
//     const {data} = req.body ; 
//     if(!data){
//         // if no data entered then book will not be added
//         return res.status(400).json({
//             success : false , 
//             message : "No Data Found , Book Not Added"
//         });
//     }

//     const book = books.find((each)=> each.id === data.id);
//     if(book){
//         // if data.id matches with an existing id then also book wont be added
//         return res.status(404).json({
//             success : false , 
//             message : "Book With Same ID Already Exists , Enter A Unique ID"
//         });
//     }
//     const allBooks = {...books , data} ; 
//     // using spread operator to view all details
//     return res.status(201).json({
//         success : true , 
//         message : "Book Added Successfully" , 
//         data : allBooks ,
//     });
// });




/*
    Route : /:id
    full route : http://localhost:8081/books/:id
    Method : PUT
    Description : Update a book by id
    Access : Public
    Parameters : id
    Data : id , name , author , genre , price , publisher
*/

router.put("/:id" , updateBookById);

// router.put("/:id" , (req, res) => {
//     const {id} = req.params;
//     // id wont be updated , will only be passed 
//     const {data} = req.body;
//     const book = books.find((each)=> each.id === id);
//     if(!book){
//         return res.status(400).json({
//             success : false , 
//             message : "No Book Found With The Same ID , Try Again"
//         });
//     };
    
//     const updateBookData = books.map((each)=> {
//         // mapping each id
//         if(each.id===id)
//         {
//             // if ID matches with the passed id then 
//             return {...each , ...data }; 
//             // ...each means all values this ID is holding right now 
//             // ...data means the values that need to be updated sent through the body
//             // ...each , ...data means update values that need to be updated and keep others same
            

//             /*                                                  SPREAD OPERATOR EXAMPLE 
//                 let x = 3 , y=2 ;
//                 x =5 ;

//                 output of x and y will now be x=5 , y=2
//                 BECAUSE RECENT VALUES ARE TAKEN AND OLD VALUES THAT AREN'T UPDATED REMAIN SAME
//             */
//         };
//         return each ; 
//     });

//     res.status(200).json({
//         success : true , 
//         message : "Book Updated By Their ID" ,
//         data : updateBookData ,
//     });
// });


module.exports = router ;
// returning back the particular export back 


