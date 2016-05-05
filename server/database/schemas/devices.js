/* Model for Devices */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
    name: String,
    description: String,
    location: String,
    type: String,
    uri: String,
    controllerId: Schema.ObjectId,
    created: Date
});

module.exports = mongoose.model('Device', deviceSchema);
