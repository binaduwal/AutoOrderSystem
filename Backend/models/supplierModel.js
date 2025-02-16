const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({

    name: {
         type: String,
          required: true },

    phoneNumber: { 
        type: Number,
         required: true },

    address: {
         type: String,
          required: true },
          
    productId: {
         type:Number
        }
});

const Supplier = mongoose.model('Product', supplierSchema);