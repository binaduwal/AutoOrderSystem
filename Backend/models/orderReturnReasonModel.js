const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderReturnReasonSchema = new Schema({
  status: {
    type: String,
    enum: ['active', 'inactive'],
    required: true
  }
}, { timestamps: true })

const OrderReturnReason = mongoose.model('OrderReturnReason', orderReturnReasonSchema)

module.exports = OrderReturnReason
