/*----------  Dependencies  ----------*/
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var db = require('./database');

/*----------  Setup App  ----------*/
var app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Allow requests from other origins
app.use(cors());

/* Initialize routes */
// app.use(express.static(path.join(__dirname, '../client/hamwip_client_nonangular/app')));
app.use(express.static(path.join(__dirname, '/dist')));
// Admin CRUD interface
app.use(express.static(path.join(__dirname, '/../client/hamwip_client_nonangular/app')));
app.get('/admin', function(req, res) {
  res.sendFile(path.join(__dirname, '/../client/hamwip_client_nonangular/app/index.html'));
});
routes = require('./router')(app);
// Catch all other routes
app.all('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

/* Start the server */
app.listen(port, function() {
  console.log('Listening on port ' + port);
});
