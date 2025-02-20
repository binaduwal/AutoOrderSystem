const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNumber: { type: String },
  role: { type: String, required: true, enum: ['superadmin', 'salesperson'] },
  permissions: [{ type: String }],
  username: { type: String, required: true, unique: true },
});

const User = mongoose.model('User', userSchema);
module.exports = User
