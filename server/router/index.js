/* Module export for all routes */

var path = require('path');

module.exports = function(app) {
  app.use('/users', require('./routes/users'));
  app.use('/controllers', require('./routes/controllers'));
  app.use('/devices', require('./routes/devices'));
  app.use('/devicebindings', require('./routes/devicebindings'));
  app.use('/controllerbindings', require('./routes/controllerbindings'));

  // Admin interface
  app.get('/admin', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/admin/index.html'));
  });

  // Catch all other routes
  app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
};
