const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  name: String,
  desc: String,
  id: Number,
  image: { data: Buffer, contentType: String },
  imageType: String,
  accessToken: String
});

module.exports = mongoose.model('Users', UsersSchema);
