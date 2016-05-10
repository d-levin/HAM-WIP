/* Connection to MongoDB */

var mongoose = require('mongoose');

// String after port specifies which db to use on the given server
//var connectionString = 'mongodb://localhost:27017/ham-wip';
var dbuser = 'dbuser';
var dbpassword = 'dbpassword';
var connectionString = 'mongodb://' + dbuser + ':' + dbpassword + '@ds019101.mlab.com:19101/ham-wip';

mongoose.connect(connectionString, function(err) {
  if (err) {
    console.log('Mongoose connection failed');
  } else {
    console.log('Mongoose connected to ' + connectionString);
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
