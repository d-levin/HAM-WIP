/* Module export for all routes */

var path = require('path');

module.exports = function(app, passport) {
  app.use('/users', require('./routes/users'));
  app.use('/controllers', require('./routes/controllers'));
  app.use('/devices', require('./routes/devices'));
  app.use('/devicebindings', require('./routes/devicebindings'));
  app.use('/controllerbindings', require('./routes/controllerbindings'));

  // Sign out user
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Authentication-based redirection
  app.post('/api/signup', passport.authenticate('local-signup', {
    successRedirect: '/dashboard',
    failureRedirect: '/signup'
  }));

  // Admin interface
  app.get('/admin', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/admin/index.html'));
  });

  // Catch all other routes
  app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
};

/* Authentication middleware */
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next;
  }
  res.redirect('/');
}
