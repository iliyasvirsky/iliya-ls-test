const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  name: String,
  desc: String,
  id: { type: Number, default:1 },
  image: { data: Buffer, contentType: String },
  imageType: String
});

module.exports = mongoose.model('Users', UsersSchema);
