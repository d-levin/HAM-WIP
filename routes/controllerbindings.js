/* Routes for mapping Controllers to Users */

module.exports = function(app) {

    var express = require('express');
    var controllerBindingsRouter = express.Router();

    var User = require(__base + 'models/user');
    var Controller = require(__base + 'models/controller');

    var controllerIdUserIdRoute = '/:controllerId/:userId';

    // Bind the given controller to the specific user
    controllerBindingsRouter.put(controllerIdUserIdRoute, function(req, res) {
        User.findById(req.params.userId, function(err, user) {
            if (err) {
                res.send(err);
            }

            // Adding to set prevents duplicates
            var added = user.controllers.addToSet(req.params.controllerId);
            var returnCode = 200;
            if (added.length <= 0) {
                returnCode = 409;
            }

            user.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.sendStatus(returnCode);
            });
        });
    });

    // Delete controller by from user
    controllerBindingsRouter.delete(controllerIdUserIdRoute, function(req, res) {
        User.findById(req.params.userId, function(err, user) {
            if (err) {
                res.send(err);
            }

            // Controller ID must exist in array in order to be removed
            var index = user.controllers.indexOf(req.params.controllerId);
            if (index < 0) {
                res.sendStatus(404);
            } else {
                user.controllers.pull({ _id: req.params.controllerId });
                user.save(function(err) {
                    if (err) {
                        res.send(err);
                    }
                    res.sendStatus(200);
                });
            }
        });
    });

    /* Initialize route */
    app.use('/controllerbindings', controllerBindingsRouter);
};
