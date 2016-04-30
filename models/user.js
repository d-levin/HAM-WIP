/* Model for a User */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    country: String,
    street1: String,
    street2: String,
    state: String,
    zip: Number,
    pwHash: String,
    pwSalt: String,
    created: Date,
    controllers: [{
        type: Schema.ObjectId,
        ref: 'Controller',
        unique: true
    }]
});

module.exports = mongoose.model('User', userSchema);
