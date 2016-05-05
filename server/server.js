/*----------  Dependencies  ----------*/
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./database');

/*----------  Setup App  ----------*/
var app = express();
var port = process.env.PORT || 8080;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* Initialize routes */
app.use(express.static(path.join(__dirname, '../client/app')));
routes = require('./router')(app);

/* Start the server */
app.listen(port, function() {
    console.log('Listening on port ' + port);
});
