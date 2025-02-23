const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderItemSchema = new Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', 
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
  vatAmount: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
}, { timestamps: true })

const OrderItem = mongoose.model('OrderItem', orderItemSchema)

module.exports = OrderItem
