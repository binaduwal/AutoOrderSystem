const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  display_name: { type: String, required: true },
  description: { type: String, required: true },
  permissions: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Permission' 
    }
  ]
});

const Role = mongoose.model('Role', roleSchema);


module.exports = Role; 