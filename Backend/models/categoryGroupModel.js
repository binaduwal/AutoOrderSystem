const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoryGroupSchema = new Schema({
  groupName: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive' ], 
    required: true, 
  }
}, { timestamps: true }) 

const Category = mongoose.model('CategoryGroup', categoryGroupSchema)

module.exports = Category
