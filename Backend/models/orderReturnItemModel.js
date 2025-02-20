const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderReturnItemSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true
  },
  qty: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  vatAmount: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const OrderReturnItem = mongoose.model('OrderReturnItem', orderReturnItemSchema);

module.exports = OrderReturnItem;
