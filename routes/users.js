/* Routes for Users */

module.exports = function(app) {

    var express = require('express');
    var User = require(__base + 'models/user');
    var usersRouter = express.Router();

    var userIdRoute = '/:userId';

    // Create a new User
    usersRouter.post('/', function(req, res) {
        var user = new User();
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.created = new Date();

        // Save the user
        user.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'User created' });
        });
    });

    // Return all Users
    usersRouter.get('/', function(req, res) {
        User.find(function(err, users) {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    });

    // Get User by ID
    usersRouter.get(userIdRoute, function(req, res) {
        User.findById(req.params.userId, function(err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    });

    // Update User by ID
    usersRouter.put(userIdRoute, function(req, res) {
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
    usersRouter.delete(userIdRoute, function(req, res) {
        User.remove({
            _id: req.params.userId
        }, function(err, user) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });
    });

    /* Initialize route */
    app.use('/users', usersRouter);
};
