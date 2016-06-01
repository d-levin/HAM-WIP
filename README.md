# HAM-WIP

#### Install dependencies:
* cd server && npm install
* cd client && npm install && bower install

#### Directions:
* Run server using 'npm start' from the HAM-WIP/server directory
* Run tests using 'npm test' from the HAM-WIP/server directory
* Build client using 'grunt' from the HAM-WIP/client directory
	* Builds the app to /server/dist/
* Run client using 'grunt serve' from the HAM-WIP/client directory to preview on port 9000
* Azure 'git push azure master'

#### MongoDB
* The app connects to a free MongoDB at [mLab](https://mlab.com)
	* Database: ham-wip
	* Username: dbuser
	* Password: dbpassword
* Because a free low-performance database is used, there is a slight delay when retrieving data in the app

#### Features
* Go to http://localhost:3000 to load the Angular version of the app
	* Loads the website from /server/dist/
	* Update the files in dist first by running 'grunt' from /client/
* To load the non-Angular admin CRUD page, go to http://localhost:3000/admin

#### Misc
* Try GET/POST/PUT/DELETE requests by using something like [Postman](https://www.getpostman.com). Make sure to select x-www-form-urlencoded for the request body.
* To insert test data, run 'node fake-data-generator.js' from the /misc/ directory

HTTP VERB | PATH | ACTION | RETURN VALUE
--- | --- | --- | ---
GET | / | Retrieve root | index.html
GET | /admin | Retrieve admin page | Serves the admin CRUD interface
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
GET | /controllers/byuser/:userId | Retrieve all controllers mapped to the specified user | JSON object
GET | /controllers/uri/:uri | Retrieve one controller by URI | JSON object
GET | /devices/ | Retrieves all devices | JSON object
GET | /devices/:deviceId | Retrieves device with specified ID | JSON object
PUT | /devices/:deviceId | Updates device with specified ID | 
PUT | /devices/:deviceId/toggle | Toggles device on/off | 
PUT | /devices/register/:deviceId | Marks device with specified ID as registered | The updated JSON object
PUT | /devices/unregister/:deviceId | Marks device with specified ID as unregistered | The updated JSON object
DELETE | /devices/:deviceId | Delete device with specified ID |
POST | /devices/ | Creates a new device |
PUT | /controllerbindings/:controllerId/:userId | Adds controller to user | HTTP Status Codes
DELETE | /controllerbindings/:controllerId/:userId | Removes controller from user | HTTP Status Codes
PUT | /devicebindings/:deviceId/:controllerId | Adds device to controller | HTTP Status Codes
DELETE | /devicebindings/:deviceId/:controllerId | Removes device from controller | HTTP Status Codes

#### Requirements
* A modern browser (ideally supporting HTML5 for prettified URLs)