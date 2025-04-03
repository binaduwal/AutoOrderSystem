const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  contactNo: { type: String },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['superadmin', 'admin','salesperson'] },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  address: { type: String },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
