const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    name: {
         type: String,
          required: true },

    description: {
         type: String },

    price: { 
        type: Number,
         required: true },

    stockQuantity: {
         type: Number,
          required: true },
          
    supplierId: {
         type:Number
        }
});

const Product = mongoose.model('Product', productSchema);