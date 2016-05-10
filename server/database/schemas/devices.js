/* Model for Devices */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  location: String,
  type: String,
  uri: String,
  created: Date,
  registered: Boolean,
  controllerId: { type: Schema.ObjectId, ref: 'Controller' }
});

module.exports = mongoose.model('Device', deviceSchema);
