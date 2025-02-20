const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productUnitSchema = new Schema({
  unitName: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    required: true
  }
}, { timestamps: true });

const ProductUnit = mongoose.model('ProductUnit', productUnitSchema);

module.exports = ProductUnit;
