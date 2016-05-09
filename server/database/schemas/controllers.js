/* Model for Controllers */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var controllerSchema = new Schema({
  make: String,
  model: String,
  version: Number,
  devices: [{
    type: Schema.ObjectId,
    ref: 'Device',
    unique: true
  }],
  userId: Schema.ObjectId,
  created: Date
});

module.exports = mongoose.model('Controller', controllerSchema);
