/* Model for Devices */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  location: String,
  type: String,
  uri: { type: String, unique: true, required: true },
  created: Date,
  controllerId: [{
    type: Schema.ObjectId,
    ref: 'Controller',
    unique: true
  }]
});

module.exports = mongoose.model('Device', deviceSchema);
