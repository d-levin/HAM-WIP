/* Routes for Controllers */

module.exports = function(app) {

    var express = require('express');
    var Controller = require(__base + 'models/controller');
    var controllersRouter = express.Router();

    var controllerIdRoute = '/:controllerId';

    // Create a new Controller
    controllersRouter.post('/', function(req, res) {
        var controller = new Controller();
        controller.make = req.body.make;
        controller.model = req.body.model;
        controller.version = req.body.version;
        controller.created = new Date();
        controller.userId = req.body.userId;

        // Save the Controller
        controller.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Controller created' });
        });
    });

    // Return all Controllers
    controllersRouter.get('/', function(req, res) {
        Controller.find(function(err, controllers) {
            if (err) {
                res.send(err);
            }
            res.json(controllers);
        });
    });

    // Get Controller by ID
    controllersRouter.get(controllerIdRoute, function(req, res) {
        Controller.findById(req.params.controllerId, function(err, controller) {
            if (err) {
                res.send(err);
            }
            res.json(controller);
        });
    });

    // Update Controller by ID
    controllersRouter.put(controllerIdRoute, function(req, res) {
        Controller.findById(req.params.controllerId, function(err, controller) {
            if (err) {
                res.send(err);
            }

            controller.make = req.body.make;
            controller.model = req.body.model;
            controller.version = req.body.version;

            // Save the updated controller
            controller.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Controller updated' });
            });
        });
    });

    // Delete Controller by ID
    controllersRouter.delete(controllerIdRoute, function(req, res) {
        Controller.remove({
            _id: req.params.controllerId
        }, function(err, controller) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted' });
        });
    });

    /* Initialize route */
    app.use('/controllers', controllersRouter);
};
