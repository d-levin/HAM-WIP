/*====================================
=            Dependencies            =
====================================*/
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

/*----------  Models  ----------*/
var User = require('./models/user');

/*----------  Express Related  ----------*/

var app = express();
var router = express.Router();
var port = process.env.PORT || 8080;

/*----------  Body-Parser  ----------*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/*=====  End of Dependencies  ======*/

/*----------  Static Route  ----------*/
app.use(express.static(__dirname + '/public'));

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

/*=========================================
=            Terminate Program            =
=========================================*/
/* Disconnect Mongoose when Node process terminates */
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Server terminated\nDisconnecting Mongoose connection');
        process.exit(0);
    });
});
/*=====  End of Terminate Program  ======*/

/*==============================
=            Routes            =
==============================*/
var userRoute = '/users';
var userIdRoute = '/users/:userId';

// Initial page
router.get('/', function(req, res) {
    res.send('/index.html');
});

// Create a new User
router.post(userRoute, function(req, res) {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    console.log(user.firstName);

    // Save the user
    user.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'User created' });
    });
});

// Return all Users
router.get(userRoute, function(req, res) {
    User.find(function(err, users) {
        if (err) {
            res.send(err);
        }
        res.json(users);
    });
});

// Get User by ID
router.get(userIdRoute, function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json(user);
    });
});

// Update User by ID
router.put(userIdRoute, function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            res.send(err);
        }

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;

        // Save the updated user
        user.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'User updated' });
        });
    });
});

// Delete User by ID
router.delete(userIdRoute, function(req, res) {
    User.remove({
        _id: req.params.userId
    }, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    });
});

/*----------  Register Routes  ----------*/
app.use('/routes', router);

/*=====  End of Routes  ======*/


/*========================================
=            Start the server            =
========================================*/
app.listen(port, function() {
    console.log('Listening on port ' + port);
});
/*=====  End of Start the server  ======*/
