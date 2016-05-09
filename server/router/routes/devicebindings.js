/* Routes for mapping Controllers to Users */

var express = require('express');
var router = express.Router();

// Include schemas
var db = require('../../database');
var Controller = db.controllers;
var Device = db.devices;

// Routes
var deviceIdControllerIdRoute = '/:deviceId/:controllerId';

// Bind the given device to the specific controller
router.put(deviceIdControllerIdRoute, function(req, res) {
  Controller.findById(req.params.controllerId, function(err, controller) {
    if (err) {
      return res.send(err);
    }

    // Adding to set prevents duplicates
    var added = controller.devices.addToSet(req.params.deviceId);
    var returnCode = 200;
    if (added.length <= 0) {
      returnCode = 409;
    }

    controller.save(function(err) {
      if (err) {
        return res.send(err);
      }
      res.sendStatus(returnCode);
    });
  });
});

// Delete controller by from user
router.delete(deviceIdControllerIdRoute, function(req, res) {
  Controller.findById(req.params.controllerId, function(err, controller) {
    if (err) {
      return res.send(err);
    }

    // Device ID must exist in array in order to be removed
    var index = controller.devices.indexOf(req.params.deviceId);
    if (index < 0) {
      res.sendStatus(404);
    } else {
      controller.devices.pull({ _id: req.params.deviceId });
      controller.save(function(err) {
        if (err) {
          return res.send(err);
        }
        res.sendStatus(200);
      });
    }
  });
});

module.exports = router;
