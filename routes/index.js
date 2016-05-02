/* Module export for all routes */


module.exports = function(app) {
    require('./users')(app);
    require('./controllers')(app);
    require('./devices')(app);
}
