const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  orderNo: { type: String, required: true, unique: true },
  orderDate: { type: Date, required: true },
  estimatedDeliveryDate: { type: Date, required: true },
  partyID: { type: mongoose.Schema.Types.ObjectId, ref: 'Party', required: true },
  remarks: { type: String, default: '' },
  salesmanID: { type: mongoose.Schema.Types.ObjectId, ref: 'Salesperson', required: true },
  paymentModeID: { type: mongoose.Schema.Types.ObjectId, ref: 'PaymentMode', required: true },
  orderItems: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderItem'
  }],
  grandTotal: { type: Number, required: true }
}, { timestamps: true })

const Order = mongoose.model('Order', OrderSchema)
module.exports = Order
