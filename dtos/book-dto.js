// Data Transfer Object 
// we will be transferring data from one object to another from here

// we cannot do it like , obj2 = obj 1 , because its a reference being passed with the address and same data will be in both
// not a good approach since we will be handling a lot of objects 

class IssuedBook {
    // the issued book which we found has these details to be displayed 

    _id;
    // since id is auto generated it wont be passed hence written like this _id (with underscore)
    name;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;
    // these are details we need of the issuedBook object in the controller where we have which books are issued ROUTE

    constructor(user){
        // in JS we only write constructor not the name of the class after it 
        // constructor is auto invoked when an object is made 

        // transferring user info to this object 
        this._id = user.issuedBook._id ; 
        this.name = user.issuedBook.name ;
        this.genre = user.issuedBook.genre ; 
        this.price = user.issuedBook.price ; 
        this.publisher = user.issuedBook.publisher ; 
        this.issuedBy = user.issuedBy ; 
        this.issuedDate = user.issuedDate ; 
        this.returnDate = user.returnDate ; 
        // these last 3 are in users model
    };

    // var ref = new issuedBook(userObj);
    // constructor will be invoked when an object is made and then transfer to var ref
    // we used to write like this to invoke the constructor

};

module.exports = IssuedBook ;