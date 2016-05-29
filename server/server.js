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

/* Configure middleware */
app.use(cors()); // Allow cross origin requests (requests from outside domains)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/dist')));

// For passport
app.use(session({
  secret: 'idontknowwhatwereyellingabout',
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);


/* Initialize routes */
routes = require('./router')(app, passport);

/* Start the server */
app.listen(config.port, function() {
  console.log('Listening on port ' + config.port);
});
