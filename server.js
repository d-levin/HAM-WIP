/*====================================
=            Dependencies            =
====================================*/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

/*----------  Setup App  ----------*/
var port = process.env.PORT || 8080;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
/*=====  End of Dependencies  ======*/

/* Keep track of base directory to avoid long include-paths */
global.__base = __dirname + '/';


/*========================================
=            MongoDB database            =
========================================*/
var MONGODB_CONNECTION = 'localhost:27017';

mongoose.connect(MONGODB_CONNECTION);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + MONGODB_CONNECTION);
});

mongoose.connection.on('error', function() {
    console.log('Mongoose connection to ' + MONGODB_CONNECTION + ' failed');
});

mongoose.connection.on('disconnect', function() {
    console.log('Mongoose connection disconnected');
});
/*=====  End of MongoDB database  ======*/

/*
 * Handles CTRL-C signal
 * Disconnect Mongoose when Node process terminates
 */
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Server terminated\nDisconnecting Mongoose connection');
        process.exit(0);
    });
});

/* Initialize routes */
routes = require('./routes')(app);

/* Start the server */
app.listen(port, function() {
    console.log('Listening on port ' + port);
});
