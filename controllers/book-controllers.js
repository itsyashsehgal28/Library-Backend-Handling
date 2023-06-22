// const {userModel , bookModel} = require("../models/index");
const {userModel , bookModel} = require("../models");
// if you write like this its also valid as it will always assume or take index.js file



/*
                                                        2 APPROACHES TO WRITE THIS 

    1.      const getAllBooks = () => {} ; 
            const getBookById = () => {} ;
            module.exports = {getAllBooks , getBookById} ;


    2.      exports.getAllBooks = () => {} ; 
            exports.getBookById = () => {} ;


    FOLLOWING SECOND APPROACH , CAUSE IT WILL BE HARD TO TRACK LATER ON IF I MISS SOMETHING

*/


// IF WE ARE WORKING WITH DATABASE WE NEED TO WRITE ASYNC AND AWAIT SINCE DATABASE TAKES TIME TO FETCH VALUES


exports.getAllBooks = async(req , res) => {
        const books = await bookModel.find();
        // find is a method of MONGODB to find all elements works same as findall method
        // this we are fetching FROM DATABASE , NOT FROM JSON FILE
        // function of MONGODB to find all records 

        if(books.length == 0 )
        {
                return res.status(400).json({
                        success : false , 
                        message : "No Book Found In the Database" , 
                });
        };
        return res.status(200).json({
                success : true , 
                message : "Book Database Found" , 
                data : books ,
        });
} ; 


exports.getBookById = async(req , res) => {
        // only adding async and await , fetching data from database no other changes required
        const {id} = req.params ;
        const book = await bookModel.findById(id);
        // method of MongoDB to find by id and parameter here is also id

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
} ;


exports.getAllIssuedBooks = async(req, res) => {
        const user = await userModel.find({
                // now we dont need both files users and books since its a foreign key in it , it will be accessed 
                issuedBook : {$exists : true} ,
                // if an attribute issuedbook exists then get that result and store it in user
        }).populate("issuedBook");
        // when we are finding based on a certain condition we need to populate to bind those results as an array into book

        // Data Transfer Object - DTO
        const IssuedBook = require("../dtos/book-dto");
        const issuedBooks = user.map((each) => new IssuedBook(each));
        // calling the DTO
        // mapping each and every element in user with "issuedBook attribute"


        if(issuedBooks.length===0){
            // if no issued book found
            return res.status(404).json({
                success : false , 
                message : "No Issued Books Found" ,
            });
        };

        return res.status(200).json({
            success : true , 
            message : "The Issued Books Are" , 
            data : issuedBooks ,
        });
};


exports.addNewBook = async(req , res) => {
        const {data} = req.body ; 
        if(!data){
                        // if no data entered then book will not be added
                        return res.status(400).json({
                            success : false , 
                            message : "No Data Found , Book Not Added"
                        });
                }


        /* since id is auto generated there wont be any duplicates hence we dont need this response triggered

                const book = await bookModel.find((each)=> each.id === data.id);
                if(book){
                                // if data.id matches with an existing id then also book wont be added
                                return res.status(404).json({
                                    success : false , 
                                    message : "Book With Same ID Already Exists , Enter A Unique ID"
                                });
                        }
        */

        // const allBooks = {...bookModel , data} ; also don't need spread operator since it only updates values 
        // we will use find to list all updated and old books in the database 
        
        await bookModel.create(data);
        // create new book with the data given , since id is auto generated no need to check

        const allBooks = await bookModel.find();
        // listing all books 


        // AWAIT IS USED ALWAYS N NUMBER OF TIMES WHENEVER PERFORMING A FUNCTION WITH THE DATABASE SINCE IT NEEDS TIME

        return res.status(201).json({
                success : true , 
                message : "Book Added Successfully" , 
                data : allBooks ,
        });




        /*
                RESULT AFTER RUNNING THE API IN THUNDERCLIENT
                
                "success": true,
                "message": "Book Added Successfully",
                "data": [
                  {
                    "_id": "6488e0f5bea861e0f8675400",     ----> HEXADECIMAL ID GENERATED AUTOMATICALLY 
                    "name": "The Lessons Of Life",
                    "author": "Yash Sehgal",
                    "genre": "Reality",
                    "price": "12.99",
                    "publisher": "Naruto Sasuke Corporation",
                    "createdAt": "2023-06-13T21:34:45.675Z",       ------>DATES ADDED AUTOMATICALLY       
                    "updatedAt": "2023-06-13T21:34:45.675Z",       ------>DATES ADDED AUTOMATICALLY
                    "__v": 0                                       ------>VERSION     
                  }
                ]
                
        */

}


exports.updateBookById = async(req, res) => {
        const {id} = req.params;
        const {data} = req.body;

        const updateBookData = await bookModel.findOneAndUpdate({_id : id} , data , {new : true});
        // find only one and update it 
        // the one to be found is _id(auto generated database id) with our parameter id
        // sending data that will be updated in the id 
        // new : true means any updated data from database should be reflected , in case of any glitch or lag 

        res.status(200).json({
                        success : true , 
                        message : "Book Updated By Their ID" ,
                        data : updateBookData ,
                });



        /*    
                WON'T WRITE THIS SINCE ID IS AUTO GENERATED 
                
                const book = books.find((each)=> each.id === id);
                if(!book){
                        return res.status(400).json({
                            success : false , 
                            message : "No Book Found With The Same ID , Try Again"
                        });
                };
        */    
};


exports.deleteBookById = async(req, res) => {
        const {id} = req.params;
    const deleteBook = await bookModel.findByIdAndDelete(id);
    
    if(!deleteBook)
    {
        // if book is not found then we cannot delete that book 
        return res.status(404).json({
            success : false , 
            message : "Book Does Not Exist"
        });
    };

    return res.status(200).json({
                success : true , 
                message : "Book Deleted" , 
                UpdatedData : await bookModel.find() , 
        });
}

    
                              