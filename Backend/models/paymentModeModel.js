const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentModeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique:true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], 
    required: true, 
  }
}, { timestamps: true })

const PaymentMode = mongoose.model('PaymentMode', paymentModeSchema)

module.exports = PaymentMode
