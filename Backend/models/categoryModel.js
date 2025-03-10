const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
  category_name: { type: String, required: true, unique: true },
  display_name: { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'inactive' ], 
    required: true, 
  },
  description: { type: String }
})

module.exports = mongoose.model("Category", CategorySchema)
