
// WE WRITE IN CURLY BRACES SINCE DATA MIGHT BE ADDED IN THESE FILES LIKE MORE ARRAYS MIGHT BE ADDED 
// THEN IT WILL BE COMPLEX TO DETERMINE WHICH TO USE SO WE ADD CURLY BRACES (for referrence :  DAY 39 , 1:48:00 )


// const { Router } = require("express");
const express = require("express");
// importing express

const router = express.Router();
// Initializing express
// instead of writing app.get we will write router.get

const {users} = require("../data/users.json");
// importing the users database


// const bookModel = require("../models/book-model");
// const userModel = require("../models/user-model");  
// OR now we can write this together since both files are inside LOCAL index.js
const {userModel , bookModel} = require("../models/index");
// this has both the files imported , choose whatever approach you like

const {getAllUsers , addNewUser , getSingleUserById , updatingUserById , deleteUserById , 
    getSubscriptionDetailsById} = require("../controllers/user-controllers");

// http://localhost:8081/users
// ROUTES HERE WILL BE OF THIS TYPE
// after which the routes will be appended



/*
    Route : /
    full route : http://localhost:8081/users
    Method : GET
    Description : Get all users info
    Access : Public
    Parameters : None
*/

router.get("/" , getAllUsers);
// router.get("/" , (req , res) =>{
//     res.status(200).json({
//         success : true , 
//         data : users
//         // whole file will be sent as a response 
//     })
// });



/*
    Route : /
    full route : http://localhost:8081/users
    Method : POST
    Description : Create a New User
    Access : Public
    Parameters : None
*/

router.post("/" , addNewUser);
// router.post("/" , (req , res) => {
//     const {id , name , surname , email , subscriptionType , subscriptionDate} = req.body ;
//     // we will add these details in the body of THUNDER CLIENT and send the data like this in JSON Format
//     /*
//         {
//             "id": "5",
//             "name": "Yash",
//             "surname": "Sehgal",
//             "email": "yashsehgal2000@gmail.com",
//             "subscriptionType": "Premium",
//             "subscriptionDate": "27/05/2023"
//         }
//     */ 

//     const user = users.find((each) => each.id === id);
//     if(user)
//     {
//         // if user with the same id already exists then 
//         return res.status(404).json({
//             success : false , 
//             message : "User with same ID already exists"
//         });
//     }
    
//     // if there is no user with the same UNIQUE id , we will add this new user
//     users.push({
//         id , 
//         name , 
//         surname , 
//         email , 
//         subscriptionType , 
//         subscriptionDate ,
//     });

//     return res.status(201).json({
//         success : true , 
//         message : "User Added Successfully" , 
//         data : users
//     });
// });



/*
    Route : /:id
    // when we send a parameter we need to add a colon (:) before a variable name 
    full route : http://localhost:8081/users/:id
    Method : GET
    Description : Get single user info by id
    Access : Public
    Parameters : id
*/

router.get("/:id" , getSingleUserById );
// router.get("/:id" , (req , res) => {
//     const {id} = req.params ;
//     // WE WRITE IN CURLY BRACES SINCE DATA MIGHT BE ADDED IN THESE FILES LIKE MORE ARRAYS MIGHT BE ADDED

//     // const id = req.params.id 
//     // we can write like this too since it specifically mentions the id , both work fine whichever is comfortable
//     const user = users.find((each)=> each.id ===id);
//     // we will find if this id exists in the Users or users.json file or not
//     if(!user){
//         // if not found in user
//         return res.status(404).json({
//             success : false ,
//             message : "User ID not found"
//         });
//     }
//     // this is else statement , if found in user
//     return res.status(200).json({
//         success : true , 
//         message : "User found" ,
//         data : user
//     });
// });




/*
    Route : /:id
    full route : http://localhost:8081/users/:id
    Method : PUT
    Description : Updating a user by ID
    Access : Public
    Parameters : ID
*/

router.put("/:id" , updatingUserById );
// router.put("/:id" , (req, res) => {
//     const {id} = req.params ;
//     // we will need ID to search for the user to update its values or add values  
//     const {data} = req.body ;
//     // its the data which needs to be added or updated , written inside the body like this 
//     /*
//         {
//             "data" :
//                 {
//                     "subscriptionType" : "Standard"
//                 }
//         }
//     */

//     const user = users.find((each) => each.id === id);
//     if(!user)
//     {
//         // if user is not found then , no updations or changes can occur 
//         return res.status(404).json({
//             success : false , 
//             message : "User Does Not Exist"
//         });
//     };

//     const updateUserData = users.map((each) => {
//         // map each item of array with each id 
//         if(each.id === id )
//         {
//             // if id matches use SPREAD OPERATOR
//             return {
//                 ...each , 
//                 // all the data under this id mentioned above , for example let id = 4
//                 /*
//                     THIS ALL FALLS UNDER EACH 
//                     "name" : "Jane" ,
//                     "surname" : "Doe" ,
//                     "email" : "user@email.com" , 
//                     "subscriptionType" : "Basic" ,
//                     "subscriptionDate" : "03/01/2022"
//                 */
//                 ...data ,
//                 // updated data 
//                 /*
//                     {
//                         "data" :
//                             {
//                               "subscriptionType" : "Standard" ,
//                               "name" : "Shakti" , 
//                               "surname" : "Sehgal"
//                             }
//                     }
//                 */
//             };
//         }
//         return each ;
//         // if nothing is updated and request is sent then return the original data 
//     });

//     // FINAL DATA WILL BE 
//     /*
//         {
//             "id": "4",
//             "name": "Shakti",
//             "surname": "Sehgal",
//             "email": "user@email.com",
//             "subscriptionType": "Standard",
//             "subscriptionDate": "03/01/2022"
//         }
//     */

//     res.status(200).json({
//         success : true , 
//         message : "User Information Updated" , 
//         data : updateUserData ,
//     }); 
// });



/*
    Route : /:id
    full route : http://localhost:8081/users/:id
    Method : DELETE
    Description : Deleting a user by ID
    Access : Public
    Parameters : ID
*/

router.delete("/:id" , deleteUserById);
// router.delete("/:id" , (req , res) => {
//     const {id} = req.params ; 
//     // id is requested as a parameter in the route 
//     const user = users.find((each) => each.id === id);
//     // user will store true or false based on if it found the id or not 
//     if(!user)
//     {
//         // if user is not found then we cannot delete that user 
//         return res.status(404).json({
//             success : false , 
//             message : "User Does Not Exist"
//         });
//     };

//     // if user is found then value of user is used to find the index of that value
//     /*
//                                                 Use of INDEXOF function
//         var arr = ["six" , "seven" , "eight"]
//         arr.indexOf("seven");

//         OUTPUT ------> 1 

//         this function will output the index value where the passed value is stored at in the array 

//     */ 
//     const index = users.indexOf(user);
//     users.splice(index , 1);
//     // removing elements from index to how many elements are to be deleted

//     return res.status(200).json({
//         success : true , 
//         message : "User Deleted" , 
//         UpdatedData : users , 
//     });
// });



/*
    Route : /users/subscription-details/(id)
    Full Route : http://localhost:8081/users/subscription-details/(id)
    Method : GET 
    Description : Get user subscription details 
        >> Date of Subscription
        >> Valid Till
        >> Is there any fine
    Access : Public
    Parameters : ID
*/

router.get("/subscription-details/:id" , getSubscriptionDetailsById);
/*
    router.get("/subscription-details/:id" , (req ,res) => {
        const {id} = req.params;
        const user = users.find((each)=> each.id === id);

        if(!user){
            return res.status(404).json({
                success : false ,
                message : "User With This ID Doesn't Exist" , 
            });
        };

        // a method with data as a parameter , it will be called this is declaration
        const getDataInDays = (data = "") => {
            // This function converts date into how many days from 01/01/1970
            let date ; 
            if(data === ""){
                date = new Date();
                // if no data is provided means new member then we will add today's date
            }else{
                date = new Date(data);
                // if its an old data or member , date will be there
            };

            let days = Math.floor(date / (1000*60*60*24));
            // to reach date we need ---> 24 hours * 60 minutes * 60 seconds * 1000 miliseconds
            return days;
        };

        const subscriptionType = (days) => {
            // this is a method which has days as a parameter , it adds days to your subscription
                 according to subscriptionType
            if((user.subscriptionType == "Basic")){
                // plan for 3 months
                days = days + 90 ;
            }else if((user.subscriptionType == "Standard")){
                // plan for 6 months
                days = days + 180 ;
            }else if((user.subscriptionType == "Premium")){
                // plan for a year
                days = days + 365 ;
            }
            // console.log("after subscription date : " , days);
            return days;
        }


        let returnDate = getDataInDays(user.returnDate);
        // book return date to know fine 
        let currentDate = getDataInDays();
        // current date to know if subscription has expired / book late fee
        let subscriptionDate = getDataInDays(user.subscriptionDate);
        // day from 1970 when you subscribed to the library 
        let subscriptionExpiration = subscriptionType(subscriptionDate);
        // final expiration date of your subscription

        console.log("returnDate" , returnDate);
        console.log("currentDate" , currentDate);
        console.log("subscriptionDate" , subscriptionDate);
        console.log("subscriptionExpiration" , subscriptionExpiration);



            1 jan 1970 se check ho rha h ye sabh , uss date se kitne din hogye h 

            line 322 ----->let currentDate = getDataInDays();
                                currentDate
                                19512
            line 321------>let returnDate = getDataInDays("05/01/2022");
                                returnDate
                                19112


        const data = {
            ...user , 
            // showing all user data and then new data is 
            //      KEY           :            VALUE
            isSubscriptionExpired : subscriptionExpiration <= currentDate ,
            // boolean , true or false 
            daysLeftForExpiration : subscriptionExpiration <= currentDate ? 0 : subscriptionExpiration - currentDate ,
            // if expired , days left = 0  else we will subtract
            fine : (returnDate <= currentDate ? (subscriptionExpiration <= currentDate ? 100 : 50) : 0) ,
            // 100 for subscription expiration , 50 for late , 0 for none
        }

        return res.status(200).json({
            success : true , 
            message : "Subscription Detail For The User Is" ,
            data : data ,
        })
    });
*/


module.exports = router ;
// returning the particular export back 



