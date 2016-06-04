/* Authentication */

var FacebookStrategy = require('passport-facebook').Strategy;

var User = require('../database/schemas/users');
var auth = require('./auth');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
      clientID: auth.facebook.id,
      clientSecret: auth.facebook.secret,
      callbackURL: auth.facebook.callbackURL,
      profileFields: ['id', 'emails', 'name']
    },

    // Facebook responds with token and profile
    function(token, refreshToken, profile, done) {

      process.nextTick(function() {

        // Find the user based on FB id
        User.findOne({ 'facebook.id': profile.id }, function(err, user) {

          // Catch error
          if (err) {
            return done(err);
          }

          // If user exists then log them in
          if (user) {
            return done(null, user);
          } else {
            // Create user if not exists
            var newUser = new User();

            // Build the user
            newUser.facebook.id = profile.id;
            newUser.facebook.token = token;
            newUser.firstName = profile.name.givenName;
            newUser.lastName = profile.name.familyName;
            // Use the first email returned by FB
            newUser.email = profile.emails[0].value;
            // Password is required in user model
            newUser.password = 'temp';
            // Set everything else to empty
            newUser.phone = '';
            newUser.street1 = '';
            newUser.street2 = '';
            newUser.state = '';
            newUser.zip = '';
            newUser.premium = false;

            newUser.save(function(err) {
              if (err) {
                throw err;
              }

              // Return the new user on success
              return done(null, newUser);
            });
          }
        });
      });
    }));
};
