/* Routes for Users */

var express = require('express');
var router = express.Router();

// Include schemas
var db = require('../../database');
var User = db.users;

// Routes
var userIdRoute = '/:userId';

// Create a new User
router.post('/', function(req, res) {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.country = req.body.country;
    user.street1 = req.body.street1;
    user.street2 = req.body.street2;
    user.state = req.body.state;
    user.zip = req.body.zip;
    user.password = req.body.password;
    user.created = new Date();

    // Save the user
    user.save(function(err) {
        if (err) {
            return res.send(err);
        }

        // Return ID of newly created user
        res.json({ id: user._id });
    });
});

// Return all Users
router.get('/', function(req, res) {
    User.find(function(err, users) {
        if (err) {
            return res.send(err);
        }
        res.json(users);
    });
});

// Get User by ID
router.get(userIdRoute, function(req, res) {
    User.findById(req.params.userId, function(err, user) {
        if (err) {
            return res.send(err);
        }
        res.json(user);
    });
});

// Update User by ID
router.put(userIdRoute, function(req, res) {
    // With option to return the updated object
    User.findByIdAndUpdate(req.params.userId, req.body, { new: true }, function(err, post) {
        if (err) {
            return res.send(err);
        }
        // Send the updated user
        res.json(post);
    });
});

// Delete User by ID
router.delete(userIdRoute, function(req, res) {
    User.findByIdAndRemove(req.params.userId, function(err, post) {
        if (err) {
            return res.send(err);
        }
        // Send the deleted user
        res.json(post);
    });
});

module.exports = router;
