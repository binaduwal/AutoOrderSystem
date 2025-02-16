// const mongoose = require('mongoose');


// const userSchema = new mongoose.Schema({
//     name: { 
//         type: String,
//          required: true 
//         },

//     email: {
//         type: String,
//          required: true },

//     password: { 
//         type: String,
//          required: true },

//     contactNo: { 
//         type: String,
//          required: true },

//     username: { 
//         type: String,
//          required: true },


// });

// const User = mongoose.model('Company', userSchema);
// module.exports=User

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    name: { type: String }, // Used for SuperAdmin
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    contactNo: { type: String },
    username: { type: String },
    role: { 
        type: String, 
        enum: ['superadmin', 'salesperson'], 
        required: true 
    } 
});

const User = mongoose.model('User', userSchema);
module.exports = User;
