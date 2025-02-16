const mongoose = require('mongoose');


const companySchema = new mongoose.Schema({
    name: { 
        type: String,
         required: true 
        },

    phoneNo: {
        type: String,
         required: true },

    regNo: { 
        type: String,
         required: true },

    panNo: {
         type: String,
         required: true },

    location: {
         type: String,
         required: true }
});

const Company = mongoose.model('Company', companySchema);