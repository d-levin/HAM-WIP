/* Routes for Controllers */

var express = require('express');
var router = express.Router();

// Include schemas
var db = require('../../database');
var Controller = db.controllers;

// Routes
var controllerIdRoute = '/:controllerId';

// Create a new Controller
router.post('/', function(req, res) {
  var controller = new Controller();
  controller.make = req.body.make;
  controller.model = (req.body.model === undefined) ? '' : req.body.model;
  controller.version = req.body.version;
  controller.uri = req.body.uri;
  controller.userId = req.body.userId;

  // Save the Controller
  controller.save(function(err) {
    if (err) {
      return res.send(err);
    }
    res.json({ id: controller._id });
  });
});

// Return all Controllers
router.get('/', function(req, res) {
  Controller.find(function(err, controllers) {
    if (err) {
      return res.send(err);
    }
    res.json(controllers);
  });
});

// Get Controller by ID
router.get(controllerIdRoute, function(req, res) {
  Controller.findById(req.params.controllerId, function(err, controller) {
    if (err) {
      return res.send(err);
    }
    res.json(controller);
  });
});

// Get all controllers mapped to the given user
router.get('/byuser/:userId', function(req, res) {
  Controller.find({ 'userId': req.params.userId }, function(err, controllers) {
    if (err) {
      return res.send(err);
    }
    res.json(controllers);
  });
});

// Get controller by URI
router.get('/uri/:uri', function(req, res) {
  Controller.findOne({ 'uri': req.params.uri }, function(err, controller) {
    if (err) {
      return res.send(err);
    }
    res.json(controller);
  });
});

// Update Controller by ID
router.put(controllerIdRoute, function(req, res) {
  // With option to return the updated object
  Controller.findByIdAndUpdate(req.params.controllerId, req.body, { new: true }, function(err, post) {
    if (err) {
      return res.send(err);
    }
    // Send the updated controller
    res.json(post);
  });
});

// Delete Controller by ID
router.delete(controllerIdRoute, function(req, res) {
  Controller.findByIdAndRemove(req.params.controllerId, function(err, post) {
    if (err) {
      return res.send(err);
    }
    // Send the deleted controller
    res.json(post);
  });
});

module.exports = router;
