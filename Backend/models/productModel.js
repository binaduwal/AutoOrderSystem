const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: true, 
  },
  productCode: {
    type: String,
    required: true,
    unique: true, 
  },
  productUnitId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductUnit', 
    // required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
    // required: true,
  },
  vatable: {
    type: Boolean, 
    required: true,
  },
  productImage: {
    type: String, 
  },
  maxSellingPrice: {
    type: Number,
    required: true, 
  },
  maxDiscount: {
    type: Number,
    required: true, 
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], 
    required: true,
  }
}, { timestamps: true }) 

const Product = mongoose.model('Product', productSchema)

module.exports = Product
