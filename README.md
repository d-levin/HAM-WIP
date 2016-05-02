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

HTTP VERB | PATH | ACTION | RETURN VALUE
--- | --- | --- | ---
GET | / | Retrieve root | index.html
GET | /users/ | Retrieve all users | JSON object
GET | /users/:userId | Retrieve user with specified ID | JSON object
PUT | /users/:userId | Update user with specified ID | 
POST | /users/ | Creates a new user | 
GET | /controllers/ | Retrieve all controllers | JSON object
GET | /controllers/:controllerId | Retrieve controller with specified ID | JSON object
PUT | /controllers/:controllerId | Update controller with specified ID |
POST | /controllers/ | Creates a new controller | 
GET | /devices/ | Retrieves all devices | JSON object
GET | /devices/:deviceId | Retrieves device with specified ID | JSON object
PUT | /devices/:deviceId | Updates device with specified ID | 
POST | /devices/ | Creates a new device |

#### Requirements
* A modern browser
* MongoDB