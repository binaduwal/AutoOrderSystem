const mongoose = require('mongoose');

const provinceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
});

const Province = mongoose.model('Province', provinceSchema);
module.exports = Province;
