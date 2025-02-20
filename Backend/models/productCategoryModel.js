const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true
  },
  categoryGroupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoryGroup', 
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    required: true
  }
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
