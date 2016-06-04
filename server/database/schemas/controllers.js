/* Model for Controllers */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var controllerSchema = new Schema({
  make: { type: String, required: true },
  model: String,
  version: Number,
  uri: { type: String, unique: true },
  devices: [{
    type: Schema.ObjectId,
    ref: 'Device',
    unique: true
  }],
  userId: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Controller', controllerSchema);
