/* Routes for Devices */

var express = require('express');
var router = express.Router();

// Include schemas
var db = require('../../database');
var Device = db.devices;

// Routes
var deviceIdRoute = '/:deviceId';

// Create a new Controller
router.post('/', function(req, res) {
  var device = new Device();
  device.name = req.body.name;
  device.description = (req.body.description === undefined) ? '' : req.body.description;
  device.location = (req.body.location === undefined) ? '' : req.body.location;
  device.type = (req.body.type === undefined) ? '' : req.body.type;
  device.uri = (req.body.uri === undefined) ? '' : req.body.uri;
  device.registered = false;
  device.toggled = false;
  device.controllerId = req.body.controllerId;

  // Save the Device
  device.save(function(err) {
    if (err) {
      return res.send(err);
    }
    res.json({ id: device._id });
  });
});

// Return all Devices
router.get('/', function(req, res) {
  Device.find(function(err, devices) {
    if (err) {
      return res.send(err);
    }
    res.json(devices);
  });
});

// Get Device by ID
router.get(deviceIdRoute, function(req, res) {
  Device.findById(req.params.deviceId, function(err, device) {
    if (err) {
      return res.send(err);
    }
    res.json(device);
  });
});

// Turn device on/off
router.put('/:deviceId/toggle', function(req, res) {
  // With option to return the updated object
  Device.findByIdAndUpdate(req.params.deviceId, { toggled: req.params.toggle }, { new: true }, function(err, post) {
    if (err) {
      return res.send(err);
    }
    // Send the updated device
    res.json(post);
  });
});

// Mark device as registered
router.put('/register/:deviceId', function(req, res) {
  // With option to return the updated object
  Device.findByIdAndUpdate(req.params.deviceId, { registered: true }, { new: true }, function(err, post) {
    if (err) {
      return res.send(err);
    }
    // Send the updated device
    res.json(post);
  });
});

// Mark device as unregistered
router.put('/unregister/:deviceId', function(req, res) {
  // With option to return the updated object
  Device.findByIdAndUpdate(req.params.deviceId, { registered: false }, { new: true }, function(err, post) {
    if (err) {
      return res.send(err);
    }
    // Send the updated device
    res.json(post);
  });
});

// Update Device by ID
router.put(deviceIdRoute, function(req, res) {
  // With option to return the updated object
  Device.findByIdAndUpdate(req.params.deviceId, req.body, { new: true }, function(err, post) {
    if (err) {
      return res.send(err);
    }
    // Send the updated device
    res.json(post);
  });
});

// Delete Device by ID
router.delete(deviceIdRoute, function(req, res) {
  Device.findByIdAndRemove(req.params.deviceId, function(err, post) {
    if (err) {
      return res.send(err);
    }
    // Send the deleted device
    res.json(post);
  });
});

module.exports = router;
