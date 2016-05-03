/* Connection to MongoDB */

var mongoose = require('mongoose');

// String after port specifies which db to use on the given server
var CONNECTION_STRING = 'localhost:27017/ham-wip';
var connection = mongoose.connect(CONNECTION_STRING);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + CONNECTION_STRING);
});

mongoose.connection.on('error', function() {
    console.log('Mongoose connection to ' + CONNECTION_STRING + ' failed');
});

mongoose.connection.on('disconnect', function() {
    console.log('Mongoose connection disconnected');
});

module.exports = {
    connection,

    close: function() { mongoose.connection.close() }
};
