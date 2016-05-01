# HAM-WIP

#### Install dependencies:
npm install

#### MongoDB
* Make sure the user running the program has read/write permissions
to the /models/db folder before running the program.
* Start the mongod service and set --dbpath to /models/db

#### Run server:
npm start

#### Features
Go to http://localhost:8080
index.html will be served.

Try GET/POST/PUT requests by using something like [Postman](https://www.getpostman.com).
Make sure to select x-www-form-urlencoded for the request body.

COMMAND | RESULT
--- | ---
GET http://localhost:8080/users/ | Returns all users in DB as a json object
GET http://localhost:8080/users/user_id | Returns the user with the specified ID
PUT http://localhost:8080/users/user_id | Updates the user with the specified ID
POST http://localhost:8080/users/ | Creates a new user

#### Requirements
* A modern browser