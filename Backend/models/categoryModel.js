const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category_name: { type: String, required: true, unique: true },
  display_name: { type: String, required: true },
  status: {
    type: String,
    enum: ['active', 'inactive'], 
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyModel',
    required: true,
  },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Category", CategorySchema);
