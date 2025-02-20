const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderReturnSchema = new Schema({
  returnInvoice: {
    type: String,
    required: true,
    unique: true
  },
  returnedDate: {
    type: Date,
    required: true
  },
  partyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Party', 
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', 
    required: true
  },
  returnedReasonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OrderReturnReason', 
    required: true
  },
  remarks: {
    type: String
  }
}, { timestamps: true });

const OrderReturn = mongoose.model('OrderReturn', orderReturnSchema);

module.exports = OrderReturn;
