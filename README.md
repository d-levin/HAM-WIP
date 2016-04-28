# HAM-WIP

#### Install dependencies:
npm install

#### MongoDB
Make sure the user running the program has read/write permissions
to the /models/db folder before running the program.

#### Run server:
npm start

#### Features
Go to http://localhost:8080
index.html will be served.

Try GET/POST/PUT requests by using something like Postman for Chrome.

COMMAND | RESULT
--- | ---
GET http://localhost:8080/routes/users/ | Returns all users in DB as a json object.
GET http://localhost:8080/routes/users/user_id | Returns the user with the specified ID.