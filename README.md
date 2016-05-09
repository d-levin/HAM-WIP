# HAM-WIP

#### Install dependencies:
npm install

#### Directions:
* Run server using 'npm start' from the HAM-WIP directory
* Run client using 'grunt serve' from the HAM-WIP/client directory

#### MongoDB
* Start the mongod service and set --dbpath to /server/database/data
* Make sure the user running the program has read/write permissions
to the /server/database/data folder before running the program.

#### Features
* Go to http://localhost:8080 to load the non-Angular version of the app
* Go to http://localhost:9000 to load the Angular version of the app

#### Misc
* Try GET/POST/PUT requests by using something like [Postman](https://www.getpostman.com). Make sure to select x-www-form-urlencoded for the request body.
* SimpleGrid responsive grid system is used
* To insert test data, run 'node fake-data-generator.js' from the /misc/ directory

HTTP VERB | PATH | ACTION | RETURN VALUE
--- | --- | --- | ---
GET | / | Retrieve root | index.html
GET | /users/ | Retrieve all users | JSON object
GET | /users/:userId | Retrieve user with specified ID | JSON object
PUT | /users/:userId | Update user with specified ID | 
DELETE | /users/:userId | Delete user with specified ID |
GET | /users/username/:userEmail | Retrieve user with specified email | JSON object
POST | /users/ | Creates a new user | 
GET | /controllers/ | Retrieve all controllers | JSON object
GET | /controllers/:controllerId | Retrieve controller with specified ID | JSON object
PUT | /controllers/:controllerId | Update controller with specified ID |
DELETE | /controllers/:controllerId | Delete controller with specified ID |
POST | /controllers/ | Creates a new controller | 
GET | /devices/ | Retrieves all devices | JSON object
GET | /devices/:deviceId | Retrieves device with specified ID | JSON object
PUT | /devices/:deviceId | Updates device with specified ID | 
DELETE | /devices/:deviceId | Delete device with specified ID |
POST | /devices/ | Creates a new device |
PUT | /controllerbindings/:controllerId/:userId | Adds controller to user | HTTP Status Codes
DELETE | /controllerbindings/:controllerId/:userId | Removes controller from user | HTTP Status Codes
PUT | /devicebindings/:deviceId/:controllerId | Adds device to controller | HTTP Status Codes
DELETE | /devicebindings/:deviceId/:controllerId | Removes device from controller | HTTP Status Codes

#### Requirements
* A modern browser
* MongoDB