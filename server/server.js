/*  Dependencies  */
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var db = require('./database');
var config = require('./config/config');

/*  Setup App  */
var app = express();

// Allow cross origin requests (requests from outside domains)
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/dist')));

/* Initialize routes */
routes = require('./router')(app);

/* Start the server */
app.listen(config.port, function() {
  console.log('Listening on port ' + config.port);
});
