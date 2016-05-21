/* Connection to MongoDB */

var mongoose = require('mongoose');
var config = require('../config/config');

var db_options = {
  server: {
    poolSize: 10
  }
};

mongoose.connect(config.db, db_options, function(err) {
  if (err) {
    console.log('Mongoose connection failed');
  } else {
    console.log('Mongoose connected to ' + config.db);
  }
});

/*
 * Handles CTRL-C signal
 * Disconnect Mongoose when Node process terminates
 */
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Closing mongoose connection');
    console.log('Terminating server');
    process.exit(0);
  });
});

// Export models
exports.users = require('./schemas/users');
exports.controllers = require('./schemas/controllers');
exports.devices = require('./schemas/devices');
