const {userModel , bookModel} = require ("../models");

exports.getAllUsers = async(req , res) => {
    const users = await userModel.find();

    if(users.length === 0)
    {
        return res.status(400).json({
            success : false , 
            message : "No Data Found In Database"
        });
    };
    return res.status(200).json({
                success : true , 
                data : users
                // whole file will be sent as a response 
            });
    
};


exports.addNewUser = async(req , res) => {
    const {id , name , surname , email , subscriptionType , subscriptionDate} = req.body ;
    
    const newUser = userModel.create({
        name , surname , email , subscriptionType , subscriptionDate,
    });

    return res.status(201).json({
        success : true , 
        message : "User Added Successfully" , 
        data : await userModel.find() ,
    });

};


exports.getSingleUserById = async(req, res) => {
    const {id} = req.params ;
    const user = await userModel.findById(id);
    // const user = await userModel.findById(_id : id); means if they match , both work fine actually

    if(!user){
        // if not found in user Database
        return res.status(404).json({
            success : false ,
            message : "User ID not found"
        });
    }
    // if found in user
    return res.status(200).json({
        success : true , 
        message : "User found" ,
        data : user
    });

};


exports.updatingUserById = async(req, res) => {
    const {id} = req.params ;
    const {data} = req.body ;

    const updateUser = await userModel.findOneAndUpdate({_id : id} , {$set : {...data}} , {new : true});

    res.status(200).json({
                success : true , 
                message : "User Information Updated" , 
                data : updateUser ,
            }); 
};


exports.deleteUserById = async(req, res) => {
    const {id} = req.params;
    const deleteUser = await userModel.findByIdAndDelete(id);
    
    if(!deleteUser)
    {
        // if user is not found then we cannot delete that user 
        return res.status(404).json({
            success : false , 
            message : "User Does Not Exist"
        });
    };

    return res.status(200).json({
                success : true , 
                message : "User Deleted" , 
                UpdatedData : await userModel.find() , 
            });
};

exports.getSubscriptionDetailsById = async(req, res) => {
    const {id} = req.params;
    const user = await userModel.findById(id);

    if(!user){
        return res.status(404).json({
            success : false ,
            message : "User With This ID Doesn't Exist" , 
        });
    };

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
        // console.log(days);
        // to reach date we need ---> 24 hours * 60 minutes * 60 seconds * 1000 miliseconds
        return days;
    };

    const subscriptionType = (days) => {
        // this is a method which has days as a parameter , it adds days to your subscription according to subscriptionType
        if((user.subscriptionType === "Basic")){
            // plan for 3 months
            days = days + 90 ;
        }else if((user.subscriptionType === "Standard")){
            // plan for 6 months
            days = days + 180 ;
        }else if((user.subscriptionType === "Premium")){
            // plan for a year
            days = days + 365 ;
        }
        // console.log("after subscription date : " , days);
        return days;
    };

     
    let returnDate = getDataInDays(user.returnDate);
    // book return date to know fine 
    let currentDate = getDataInDays();
    // current date to know if subscription has expired / book late fee
    let subscriptionDate = getDataInDays(user.subscriptionDate);
    // day from 1970 when you subscribed to the library 
    let subscriptionExpiration = subscriptionType(subscriptionDate);
    // final expiration date of your subscription

    // console.log("returnDate" , returnDate);
    // console.log("currentDate" , currentDate);
    // console.log("subscriptionDate" , subscriptionDate);
    // console.log("subscriptionExpiration" , subscriptionExpiration);

    

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
    };

    return res.status(200).json({
        success : true , 
        message : "Subscription Detail For The User Is" ,
        data : data ,
    });

};
