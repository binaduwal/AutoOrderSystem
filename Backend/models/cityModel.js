const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  province: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Province', 
    required: true
  }
});

const City = mongoose.model('City', citySchema);
module.exports = City;
