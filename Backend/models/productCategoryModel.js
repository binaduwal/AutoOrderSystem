const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productCategorySchema = new Schema({
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
  },

  companyId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyModel', 
    required: true
 
  }

}, { timestamps: true })

const productCategory = mongoose.model('productCategory', productCategorySchema)

module.exports = productCategory