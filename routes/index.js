/* Module export for all routes */


module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile('index.html');
    })
    require('./users')(app);
    require('./controllers')(app);
    require('./devices')(app);
    require('./controllerbindings')(app);
    require('./devicebindings')(app);    
}
