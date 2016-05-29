/* Model for Users */

var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
SALT_ROUNDS = 10;

var userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: String,
  street1: String,
  street2: String,
  state: String,
  zip: String,
  premium: Boolean,
  password: { type: String, required: true },
  controllers: [{
    type: Schema.ObjectId,
    ref: 'Controller',
    unique: true
  }]
});

// Called before user creation
userSchema.pre('save', function(next) {
  var user = this;

  // No need to continue if password hasn't been modified
  if (!user.isModified('password')) {
    return next();
  }

  // Generate a salt and then a hash using the generated salt
  bcrypt.genSalt(SALT_ROUNDS, function(err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Verify passwords
userSchema.methods.validatePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};


module.exports = mongoose.model('User', userSchema);
