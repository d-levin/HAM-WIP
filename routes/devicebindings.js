/* Routes for mapping Controllers to Users */

module.exports = function(app) {

    var express = require('express');
    var deviceBindingsRouter = express.Router();

    var Controller = require(__base + 'models/controller');
    var Device = require(__base + 'models/device');

    var deviceIdControllerIdRoute = '/:deviceId/:controllerId';

    // Bind the given device to the specific controller
    deviceBindingsRouter.put(deviceIdControllerIdRoute, function(req, res) {
        Controller.findById(req.params.controllerId, function(err, controller) {
            if (err) {
                res.send(err);
            }

            // Adding to set prevents duplicates
            var added = controller.devices.addToSet(req.params.deviceId);
            var returnCode = 200;
            if (added.length <= 0) {
                returnCode = 409;
            }

            controller.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.sendStatus(returnCode);
            });
        });
    });

    // Delete controller by from user
    deviceBindingsRouter.delete(deviceIdControllerIdRoute, function(req, res) {
        Controller.findById(req.params.controllerId, function(err, controller) {
            if (err) {
                res.send(err);
            }

            // Device ID must exist in array in order to be removed
            var index = controller.devices.indexOf(req.params.deviceId);
            if (index < 0) {
                res.sendStatus(404);
            } else {
                controller.devices.pull({ _id: req.params.deviceId });
                controller.save(function(err) {
                    if (err) {
                        res.send(err);
                    }
                    res.sendStatus(200);
                });
            }
        });
    });

    /* Initialize route */
    app.use('/devicebindings', deviceBindingsRouter);
};
