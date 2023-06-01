# Book-Record-Management

# Server >> Storing certain book data
#        >> User registration
#        >> Subscriber

# This is a book management API server for library system

# FINE SYSTEM
01-01-2023 ---> 01-04-2023
03-04-2023 ---> 2 DAYS LATE * 50(LATE FEE)

# Subscription Types
3 months - (Basic)
6 months - (Standard)
12 months - (Premium)

If Subscription is STANDARD && started from 01/01/2023
    >> valid till 01/07/2023

If we are subscribed and we miss the renewal date then  >> FINE 50/day
If we are not subscribed / miss the renewal date then >> FINE 100 + 50/day


# ROUTES AND ENDPOINTS 
# /users
POST - Create a new user (post info to server)
GET - all user information (get info from server)

# /users/(id)
GET - info for a particular user by their id
PUT - update certain info of the user by their id
DELETE - Delete user by their id (check if he/she has any book issued or any fine left )

# /users/subscription-details/(id)
GET - get user subscription details 
    >> Date of Subscription
    >> Valid Till
    >> Is there any fine

# /books 
GET - get all the books
POST - Create or Add a new book 

# /books/(id)
GET - get book by ID
PUT - update books by ID

# /books/issued 
GET - all books which have been issued

# /books/issued/fine
GET - all books which have been issued with fine

# How To Start The Project
npm init 
npm i express
npm i nodemon --save-dev
npm run dev


# Specifics 
index.js contains all basic routes 
routes/users.js contains all routes related to USERS
routes/books.js contains all routes related to BOOKS