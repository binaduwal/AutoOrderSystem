const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactNo: { type: String },
  address:{type:String},
  name:{ type: String},
  status: { 
    type: String, 
    required: true, 
    enum: ['active', 'inactive'], 
    default: 'active' 
  },
  role: { type: String, required: true, enum: ['superadmin', 'admin','salesperson'] },
  username: { type: String, required: true, unique: true },
})

const Admin = mongoose.model('Admin', AdminSchema);
module.exports=Admin