/* Model for a User */

var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, lowercase: true, unique: true },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    country: String,
    street1: String,
    street2: String,
    state: String,
    zip: Number,
    hash: String,
    salt: String,
    created: Date,
    controllers: [{
        type: Schema.ObjectId,
        ref: 'Controller',
        unique: true
    }]
});

// Generates a salt and password hash
userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

// Accepts a password and compares it to the stored hash
userSchema.methods.validatePassword = function(password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');

    return this.hash === hash;
};

module.exports = mongoose.model('User', userSchema);
