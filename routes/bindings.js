/* Routes for mapping Controllers to Users */

module.exports = function(app) {

    var express = require('express');
    var Controller = require(__base + 'models/controller');
    var User = require(__base + 'models/user');
    var bindingsRouter = express.Router();

    var controllerIdUserIdRoute = '/:controllerId/:userId';

    // Bind the given controller to the specific user
    bindingsRouter.put(controllerIdUserIdRoute, function(req, res) {
        User.findById(req.params.userId, function(err, user) {
            if (err) {
                res.send(err);
            }

            // Adding to set prevents duplicates
            var added = user.controllers.addToSet(req.params.controllerId);
            var returnMessage = "";
            if (added.length > 0) {
                returnMessage = "Controller added";
            } else {
                returnMessage = "Controller NOT added";
            }

            // Save the updated user
            user.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.send(returnMessage);
            });
        });
    });

    // Delete controller by from user
    bindingsRouter.delete(controllerIdUserIdRoute, function(req, res) {
        User.findById(req.params.userId, function(err, user) {
            if (err) {
                res.send(err);
            }

            // Controller ID must exist in array in order to be removed
            var index = user.controllers.indexOf(req.params.controllerId);
            if (index < 0) {
                res.sendStatus(404);
            }

            user.controllers.pull({ _id: req.params.controllerId });
            user.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.sendStatus(200);
            });
        });
    });

    /* Initialize route */
    app.use('/bindings', bindingsRouter);
};
