/* Module export for all routes */

var path = require('path');

module.exports = function(app, passport) {
  app.use('/users', require('./routes/users'));
  app.use('/controllers', require('./routes/controllers'));
  app.use('/devices', require('./routes/devices'));
  app.use('/devicebindings', require('./routes/devicebindings'));
  app.use('/controllerbindings', require('./routes/controllerbindings'));

  // Admin interface
  // app.get('/admin', function(req, res) {
  //   res.sendFile(path.join(__dirname, '../dist/admin/index.html'));
  // });

  /*======================================
  =            Authentication            =
  ======================================*/

  // Send user to Facebook login
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

  // Handle callback after FB auth
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/'
    }),
    function(req, res) {
      res.redirect('/dashboard');
    });

  // Sign out user
  app.get('/auth/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Return the current user if authenticated
  app.get('/auth/currentuser', isAuthenticated, function(req, res) {
    res.json(req.user);
  });

  /*=====  End of Authentication  ======*/

  // Initial route
  app.all('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });

  // Catch all other routes
  app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
};

/* Middleware to check if user is logged in */
function isAuthenticated(req, res, next) {
  // Continue if logged in
  if (req.isAuthenticated()) {
    return next();
  }
  // Redirect if not
  res.redirect('/');
}
