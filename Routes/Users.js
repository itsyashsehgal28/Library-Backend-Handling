// const { Router } = require("express");
// WE WRITE IN CURLY BRACES SINCE DATA MIGHT BE ADDED IN THESE FILES LIKE MORE ARRAYS MIGHT BE ADDED 
// THEN IT WILL BE COMPLEX TO DETERMINE WHICH TO USE SO WE ADD CURLY BRACES (for referrence :  DAY 39 , 1:48:00 )

const express = require("express");
// importing express

const router = express.Router();
// Initializing express
// instead of writing app.get we will write router.get

module.exports = router ;
// returning the particular export back 


const {users} = require("../data/users.json");
// importing the users database



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
router.get("/" , (req , res) =>{
    res.status(200).json({
        success : true , 
        data : users
        // whole file will be sent as a response 
    })
});



/*
    Route : /
    full route : http://localhost:8081/users
    Method : POST
    Description : Create a New User
    Access : Public
    Parameters : None
*/
router.post("/" , (req , res) => {
    const {id , name , surname , email , subscriptionType , subscriptionDate} = req.body ;
    // we will add these details in the body of THUNDER CLIENT and send the data like this in JSON Format
    /*
        {
            "id": "5",
            "name": "Yash",
            "surname": "Sehgal",
            "email": "yashsehgal2000@gmail.com",
            "subscriptionType": "Premium",
            "subscriptionDate": "27/05/2023"
        }
    */ 

    const user = users.find((each) => each.id === id);
    if(user)
    {
        // if user with the same id already exists then 
        return res.status(404).json({
            success : false , 
            message : "User with same ID already exists"
        });
    }
    
    // if there is no user with the same UNIQUE id , we will add this new user
    users.push({
        id , 
        name , 
        surname , 
        email , 
        subscriptionType , 
        subscriptionDate ,
    });

    return res.status(201).json({
        success : true , 
        message : "User Added Successfully" , 
        data : users
    });
});





/*
    Route : /:id
    // when we send a parameter we need to add a colon (:) before a variable name 
    full route : http://localhost:8081/users/:id
    Method : GET
    Description : Get single user info by id
    Access : Public
    Parameters : id
*/
router.get("/:id" , (req , res) => {
    const {id} = req.params ;
    // WE WRITE IN CURLY BRACES SINCE DATA MIGHT BE ADDED IN THESE FILES LIKE MORE ARRAYS MIGHT BE ADDED

    // const id = req.params.id 
    // we can write like this too since it specifically mentions the id , both work fine whichever is comfortable
    const user = users.find((each)=> each.id ===id);
    // we will find if this id exists in the Users or users.json file or not
    if(!user){
        // if not found in user
        return res.status(404).json({
            success : false ,
            message : "User ID not found"
        });
    }
    // this is else statement , if found in user
    return res.status(200).json({
        success : true , 
        message : "User found" ,
        data : user
    });
});





/*
    Route : /:id
    full route : http://localhost:8081/users/:id
    Method : PUT
    Description : Updating a user by ID
    Access : Public
    Parameters : ID
*/
router.put("/:id" , (req, res) => {
    const {id} = req.params ;
    // we will need ID to search for the user to update its values or add values  
    const {data} = req.body ;
    // its the data which needs to be added or updated , written inside the body like this 
    /*
        {
            "data" :
                {
                    "subscriptionType" : "Standard"
                }
        }
    */

    const user = users.find((each) => each.id === id);
    if(!user)
    {
        // if user is not found then , no updations or changes can occur 
        return res.status(404).json({
            success : false , 
            message : "User Does Not Exist"
        });
    };

    const updateUserData = users.map((each) => {
        // map each item of array with each id 
        if(each.id === id )
        {
            // if id matches use SPREAD OPERATOR
            return {
                ...each , 
                // all the data under this id mentioned above , for example let id = 4
                /*
                    THIS ALL FALLS UNDER EACH 
                    "name" : "Jane" ,
                    "surname" : "Doe" ,
                    "email" : "user@email.com" , 
                    "subscriptionType" : "Basic" ,
                    "subscriptionDate" : "03/01/2022"
                */
                ...data ,
                // updated data 
                /*
                    {
                        "data" :
                            {
                              "subscriptionType" : "Standard" ,
                              "name" : "Shakti" , 
                              "surname" : "Sehgal"
                            }
                    }
                */
            };
        }
        return each ;
        // if nothing is updated and request is sent then return the original data 
    });

    // FINAL DATA WILL BE 
    /*
        {
            "id": "4",
            "name": "Shakti",
            "surname": "Sehgal",
            "email": "user@email.com",
            "subscriptionType": "Standard",
            "subscriptionDate": "03/01/2022"
        }
    */

    res.status(200).json({
        success : true , 
        message : "User Information Updated" , 
        data : updateUserData ,
    }); 
});





/*
    Route : /:id
    full route : http://localhost:8081/users/:id
    Method : DELETE
    Description : Deleting a user by ID
    Access : Public
    Parameters : ID
*/
router.delete("/:id" , (req , res) => {
    const {id} = req.params ; 
    // id is requested as a parameter in the route 
    const user = users.find((each) => each.id === id);
    // user will store true or false based on if it found the id or not 
    if(!user)
    {
        // if user is not found then we cannot delete that user 
        return res.status(404).json({
            success : false , 
            message : "User Does Not Exist"
        });
    };

    // if user is found then value of user is used to find the index of that value
    /*
                                                Use of INDEXOF function
        var arr = ["six" , "seven" , "eight"]
        arr.indexOf("seven");

        OUTPUT ------> 1 

        this function will output the index value where the passed value is stored at in the array 

    */ 
    const index = users.indexOf(user);
    users.splice(index , 1);

    return res.status(200).json({
        success : true , 
        message : "User Deleted" , 
        UpdatedData : users , 
    });
});






/*
    Route : /users/subscription-details/(id)
    Method : GET 
    Info : Get user subscription details 
        >> Date of Subscription
        >> Valid Till
        >> Is there any fine
*/
