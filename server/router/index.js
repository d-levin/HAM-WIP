/* Module export for all routes */

module.exports = function(app) {
  app.use('/users', require('./routes/users'));
  app.use('/controllers', require('./routes/controllers'));
  app.use('/devices', require('./routes/devices'));
  app.use('/devicebindings', require('./routes/devicebindings'));
  app.use('/controllerbindings', require('./routes/controllerbindings'));
};
