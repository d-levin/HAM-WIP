/* Routes for Devices */

module.exports = function(app) {

    var express = require('express');
    var Device = require(__base + 'models/device');
    var devicesRouter = express.Router();

    var deviceIdRoute = '/:deviceId';

    // Create a new Controller
    devicesRouter.post('/', function(req, res) {
        var device = new Device();
        device.name = req.body.name;
        device.description = req.body.description;
        device.location = req.body.location;
        device.type = req.body.type;
        device.created = new Date();
        device.controllerId = req.body.controlledId;

        // Save the Device
        device.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Device created' });
        });
    });

    // Return all Devices
    devicesRouter.get('/', function(req, res) {
        Device.find(function(err, devices) {
            if (err) {
                res.send(err);
            }
            res.json(devices);
        });
    });

    // Get Device by ID
    devicesRouter.get(deviceIdRoute, function(req, res) {
        Device.findById(req.params.deviceId, function(err, device) {
            if (err) {
                res.send(err);
            }
            res.json(device);
        });
    });

    // Update Device by ID
    devicesRouter.put(deviceIdRoute, function(req, res) {
        Device.findById(req.params.deviceId, function(err, device) {
            if (err) {
                res.send(err);
            }

            device.name = req.body.name;
            device.description = req.body.description;
            device.location = req.body.location;
            device.type = req.body.type;

            // Save the updated device
            device.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Device updated' });
            });
        });
    });

    // Delete Device by ID
    devicesRouter.delete(deviceIdRoute, function(req, res) {
        Device.remove({
            _id: req.params.deviceId
        }, function(err, device) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });
    });

    /* Initialize route */
    app.use('/devices', devicesRouter);
};
