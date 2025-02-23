const mongoose = require("mongoose")

const PermissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  display_name: { type: String, required: true },
  description: { type: String },
})

module.exports = mongoose.model("Permission", PermissionSchema)
