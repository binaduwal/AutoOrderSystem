const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  province: {
    type: String,
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
    required: true
  },
    address: {
    type: String,
    required: true,
  },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
