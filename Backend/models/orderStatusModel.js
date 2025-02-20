const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderStatusSchema = new Schema({
  statusName: {
    type: String,
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    required: true
  },
  displayName: {
    type: String,
    enum: [
      'now_order', 
      'ready to dispatch', 
      'dispatched', 
      'delivered', 
      'completed', 
      'cancelled', 
      'returned'
    ],
    required: true
  }
}, { timestamps: true });

const OrderStatus = mongoose.model('OrderStatus', orderStatusSchema);

module.exports = OrderStatus;
