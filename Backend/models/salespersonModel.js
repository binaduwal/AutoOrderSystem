const mongoose = require("mongoose");

const salespersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Salesperson name is required"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"], 
    default: "active",
  }
});

module.exports = mongoose.model("Salesperson", salespersonSchema);