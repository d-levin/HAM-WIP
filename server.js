/*----------  Dependencies  ----------*/
var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models/database');

/*----------  Setup App  ----------*/
var port = process.env.PORT || 8080;
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

/* Keep track of base directory to avoid long include-paths */
global.__base = __dirname + '/';

/*
 * Handles CTRL-C signal
 * Disconnect Mongoose when Node process terminates
 */
process.on('SIGINT', function() {
    db.close();
    console.log('Terminating...');
    process.exit(0);
});

/* Initialize routes */
routes = require('./routes')(app);

/* Start the server */
app.listen(port, function() {
    console.log('Listening on port ' + port);
});
