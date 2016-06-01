/* Authentication config */

var LocalStrategy = require('passport-local').Strategy;

var User = require('../database/schemas/users');

module.exports = function(passport) {
  /* Serialization required for persistent login sessions */
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  /* Local accounts */
  passport.use('local-signup', new LocalStrategy({
      // Map username to email field
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true // Allow passing entire request to callback
    },
    function(req, email, password, done) {
      // Asynchronous event
      // User.findOne fires when data is sent back
      process.nextTick(function() {

        // Determine if user account already exists
        // on account creation
        User.findOne({ 'email': req.params.email }, function(err, user) {
          if (err) {
            return res.send('user not found by email');
            // return done(err);
          }

          // Redirect on existing user
          if (user) {
            return done(null, false, req.redirect('/usernamealreadytaken'));
          } else {
            // User DNE
            // Create a new one
            var newUser = new User();

            // Setup credentials for the new user
            newUser.email = email;
            newUser.password = password;

            newUser.save(function(err) {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
          }
        });
      });
    }));
};
