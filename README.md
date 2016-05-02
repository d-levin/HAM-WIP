# HAM-WIP

#### Install dependencies:
npm install

#### Run server:
* npm start

#### MongoDB
* Make sure the user running the program has read/write permissions
to the /models/db folder before running the program.
* Start the mongod service and set --dbpath to /models/db

#### Features
* Go to http://localhost:8080
* index.html will be served

#### Misc
* Try GET/POST/PUT requests by using something like [Postman](https://www.getpostman.com). Make sure to select x-www-form-urlencoded for the request body.
* SimpleGrid responsive grid system is used
* Client-side logic in public/js/

COMMAND | RESULT
--- | ---
GET http://localhost:8080/ | Returns index.html
GET http://localhost:8080/users/ | Returns all users in DB as a json object
GET http://localhost:8080/users/user_id | Returns the user with the specified ID
PUT http://localhost:8080/users/user_id | Updates the user with the specified ID
POST http://localhost:8080/users/ | Creates a new user
GET http://localhost:8080/controllers/ | Returns all controllers in DB as a json object
GET http://localhost:8080/controllers/controller_id | Returns the controller with the specified ID
PUT http://localhost:8080/controllers/controller_id | Updates the controller with the specified ID
POST http://localhost:8080/controllers/ | Creates a new controller
GET http://localhost:8080/devices/ | Returns all devices in DB as a json object
GET http://localhost:8080/devices/device_id | Returns the device with the specified ID
PUT http://localhost:8080/devices/device_id | Updates the device with the specified ID
POST http://localhost:8080/devices/ | Creates a new device

#### Requirements
* A modern browser
* MongoDB