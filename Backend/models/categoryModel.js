const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category_name: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ['active', 'inactive'], 
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyModel',
  },
  description: { type: String },

  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("Category", CategorySchema);
