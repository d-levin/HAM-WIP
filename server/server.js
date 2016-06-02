/*  Dependencies  */
var express = require('express'),
  bodyParser = require('body-parser'),
  path = require('path'),
  cors = require('cors'),
  db = require('./database'),
  config = require('./config/config'),
  session = require('express-session'),
  passport = require('passport');

/*  Setup App  */
var app = express();
require('./config/passport')(passport);

/* Configure middleware */
app.use(cors()); // Allow cross origin requests (requests from outside domains)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/dist')));

/* Authentication middleware */
app.use(session({
  secret: 'canttouchthis',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

/* Initialize routes */
routes = require('./router')(app, passport);

/* Start the server */
app.listen(config.port, function() {
  console.log('Listening on port ' + config.port);
});
