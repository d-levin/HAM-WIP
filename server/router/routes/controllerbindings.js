/* Routes for mapping Controllers to Users */

var express = require('express');
var router = express.Router();

// Include schemas
var db = require('../../database');
var User = db.users;
var Controller = db.controllers;

// Routes
var controllerIdUserIdRoute = '/:controllerId/:userId';

// Bind the given controller to the specific user
router.put(controllerIdUserIdRoute, function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      return res.send(err);
    }

    // Notify controller that it is now bound to user
    Controller.findByIdAndUpdate(req.params.controllerId, { userId: req.params.userId }, function(err) {
      if (err) {
        return res.send(err);
      }

      // Adding to set prevents duplicates
      var added = user.controllers.addToSet(req.params.controllerId);
      var returnCode = 200;
      if (added.length <= 0) {
        returnCode = 409;
      }

      user.save(function(err) {
        if (err) {
          return res.send(err);
        }
        res.sendStatus(returnCode);
      });
    });
  });
});

// Delete controller from user
router.delete(controllerIdUserIdRoute, function(req, res) {
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      return res.send(err);
    }

    // Controller ID must exist in array in order to be removed
    var index = user.controllers.indexOf(req.params.controllerId);
    if (index < 0) {
      res.sendStatus(404);
    } else {
      // Notify controller that it is no longer bound to user
      Controller.findByIdAndUpdate(req.params.controllerId, { userId: undefined }, function(err) {
        if (err) {
          return res.send(err);
        }

        user.controllers.pull({ _id: req.params.controllerId });
        user.save(function(err) {
          if (err) {
            return res.send(err);
          }
          res.sendStatus(200);
        });
      });
    }
  });
});

module.exports = router;
